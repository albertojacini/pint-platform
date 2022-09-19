import datetime
from collections import defaultdict
from typing import List, Tuple

import graphene
import pytz
import requests
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.core.files import File
from django.db import transaction
from django.db.models import Exists, OuterRef
from django.utils.text import slugify

# from ....attribute import AttributeInputType
# from ....attribute import models as attribute_models
# from ....core.exceptions import PreorderAllocationError
from ....core.permissions import InitiativePermissions
from ....core.tracing import traced_atomic_transaction
from ....core.utils.date_time import convert_to_utc_date_time
from ....core.utils.editorjs import clean_editor_js
from ....core.utils.validators import get_oembed_data
# from ....order import events as order_events
# from ....order import models as order_models
# from ....order.tasks import recalculate_orders_task
from ....initiative import InitiativeMediaTypes, models
# from ....product import ProductMediaTypes, models
from ....initiative.error_codes import InitiativeErrorCode
# from ....product.error_codes import CollectionErrorCode, ProductErrorCode
from ....initiative.search import update_initiative_search_vector
# from ....product.search import update_product_search_vector
# from ....product.tasks import (
#     update_product_discounted_price_task,
#     update_products_discounted_prices_of_catalogues_task,
# )
# from ....product.utils import delete_categories, get_products_ids_without_variants
from ....product.utils.variants import generate_and_set_variant_name
from ....thumbnail import models as thumbnail_models
from ....warehouse.management import deactivate_preorder_for_variant
from ...attribute.types import AttributeValueInput
from ...attribute.utils import AttributeAssignmentMixin, AttrValuesInput
from ...channel import ChannelContext
from ...core.descriptions import (
    ADDED_IN_31,
    DEPRECATED_IN_3X_INPUT,
    PREVIEW_FEATURE,
    RICH_CONTENT,
)
from ...core.fields import JSONString
from ...core.inputs import ReorderInput
from ...core.mutations import BaseMutation, ModelDeleteMutation, ModelMutation
from ...core.scalars import WeightScalar
from ...core.types import NonNullList, InitiativeError, SeoInput, Upload
# from ...core.types import CollectionError, NonNullList, ProductError, SeoInput, Upload
from ...core.utils import (
    add_hash_to_file_name,
    clean_seo_fields,
    get_duplicated_values,
    get_filename_from_url,
    is_image_url,
    validate_image_file,
    validate_image_url,
    validate_slug_and_generate_if_needed,
)
from ...core.utils.reordering import perform_reordering
# from ...warehouse.types import Warehouse
from ..types import Initiative
# from ..types import Category, Collection, Product, ProductMedia, ProductVariant
from ..utils import (
    clean_variant_sku,
    create_stocks,
    get_draft_order_lines_data_for_variants,
    get_used_attribute_values_for_variant,
    get_used_variants_attribute_values,
    update_ordered_media,
)


# class CategoryInput(graphene.InputObjectType):
#     description = JSONString(description="Category description." + RICH_CONTENT)
#     name = graphene.String(description="Category name.")
#     slug = graphene.String(description="Category slug.")
#     seo = SeoInput(description="Search engine optimization fields.")
#     background_image = Upload(description="Background image file.")
#     background_image_alt = graphene.String(description="Alt text for a product media.")



class InitiativeInput(graphene.InputObjectType):
    attributes = NonNullList(AttributeValueInput, description="List of attributes.")
    category = graphene.ID(description="ID of the product's category.", name="category")
    charge_taxes = graphene.Boolean(
        description="Determine if taxes are being charged for the product."
    )
    collections = NonNullList(
        graphene.ID,
        description="List of IDs of collections that the product belongs to.",
        name="collections",
    )
    description = JSONString(description="Initiative description." + RICH_CONTENT)
    name = graphene.String(description="Initiative name.")
    slug = graphene.String(description="Initiative slug.")
    tax_code = graphene.String(description="Tax rate for enabled tax gateway.")
    seo = SeoInput(description="Search engine optimization fields.")
    weight = WeightScalar(description="Weight of the Initiative.", required=False)
    rating = graphene.Float(description="Defines the product rating value.")


class InitiativeCreateInput(InitiativeInput):
    product_type = graphene.ID(
        description="ID of the type that product belongs to.",
        name="productType",
        required=True,
    )


# T_INPUT_MAP = List[Tuple[attribute_models.Attribute, AttrValuesInput]]


class InitiativeCreate(ModelMutation):
    class Arguments:
        input = InitiativeCreateInput(
            required=True, description="Fields required to create a product."
        )

    class Meta:
        description = "Creates a new product."
        model = models.Initiative
        object_type = Initiative
        permissions = (InitiativePermissions.MANAGE_PRODUCTS,)
        error_type_class = InitiativeError
        error_type_field = "product_errors"

    @classmethod
    def clean_attributes(
        cls, attributes: dict, product_type: models.InitiativeType
    ) -> T_INPUT_MAP:
        attributes_qs = product_type.product_attributes
        attributes = AttributeAssignmentMixin.clean_input(attributes, attributes_qs)
        return attributes

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)

        description = cleaned_input.get("description")
        cleaned_input["description_plaintext"] = (
            clean_editor_js(description, to_string=True) if description else ""
        )

        weight = cleaned_input.get("weight")
        if weight and weight.value < 0:
            raise ValidationError(
                {
                    "weight": ValidationError(
                        "Initiative can't have negative weight.",
                        code=InitiativeErrorCode.INVALID.value,
                    )
                }
            )

        # Attributes are provided as list of `AttributeValueInput` objects.
        # We need to transform them into the format they're stored in the
        # `Initiative` model, which is HStore field that maps attribute's PK to
        # the value's PK.

        attributes = cleaned_input.get("attributes")
        product_type = (
            instance.product_type if instance.pk else cleaned_input.get("product_type")
        )  # type: models.InitiativeType

        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = InitiativeErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})

        if "tax_code" in cleaned_input:
            info.context.plugins.assign_tax_code_to_object_meta(
                instance, cleaned_input["tax_code"]
            )

        if attributes and product_type:
            try:
                cleaned_input["attributes"] = cls.clean_attributes(
                    attributes, product_type
                )
            except ValidationError as exc:
                raise ValidationError({"attributes": exc})

        clean_seo_fields(cleaned_input)
        return cleaned_input

    @classmethod
    def get_instance(cls, info, **data):
        """Prefetch related fields that are needed to process the mutation."""
        # If we are updating an instance and want to update its attributes,
        # prefetch them.

        object_id = data.get("id")
        if object_id and data.get("attributes"):
            # Prefetches needed by AttributeAssignmentMixin and
            # associate_attribute_values_to_instance
            qs = cls.Meta.model.objects.prefetch_related(
                "product_type__product_attributes__values",
                "product_type__attributeproduct",
            )
            return cls.get_node_or_error(info, object_id, only_type="Initiative", qs=qs)

        return super().get_instance(info, **data)

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        instance.save()
        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        collections = cleaned_data.get("collections", None)
        if collections is not None:
            instance.collections.set(collections)

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        product = models.Initiative.objects.prefetched_for_webhook().get(pk=instance.pk)
        update_product_search_vector(instance)
        info.context.plugins.product_created(product)

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        response = super().perform_mutation(_root, info, **data)
        product = getattr(response, cls._meta.return_field_name)

        # Wrap product instance with ChannelContext in response
        setattr(
            response,
            cls._meta.return_field_name,
            ChannelContext(node=product, channel_slug=None),
        )
        return response


class InitiativeUpdate(InitiativeCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product to update.")
        input = InitiativeInput(
            required=True, description="Fields required to update a product."
        )

    class Meta:
        description = "Updates an existing product."
        model = models.Initiative
        object_type = Initiative
        permissions = (InitiativePermissions.MANAGE_PRODUCTS,)
        error_type_class = InitiativeError
        error_type_field = "product_errors"

    @classmethod
    def clean_attributes(
        cls, attributes: dict, product_type: models.InitiativeType
    ) -> T_INPUT_MAP:
        attributes_qs = product_type.product_attributes
        attributes = AttributeAssignmentMixin.clean_input(
            attributes, attributes_qs, creation=False
        )
        return attributes

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        instance.save()
        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)

    @classmethod
    def post_save_action(cls, info, instance, _cleaned_input):
        product = models.Initiative.objects.prefetched_for_webhook().get(pk=instance.pk)
        update_product_search_vector(instance)
        info.context.plugins.product_updated(product)


class InitiativeDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product to delete.")

    class Meta:
        description = "Deletes a product."
        model = models.Initiative
        object_type = Initiative
        permissions = (InitiativePermissions.MANAGE_PRODUCTS,)
        error_type_class = InitiativeError
        error_type_field = "product_errors"

    @classmethod
    def success_response(cls, instance):
        instance = ChannelContext(node=instance, channel_slug=None)
        return super().success_response(instance)

    @classmethod
    @traced_atomic_transaction()
    def perform_mutation(cls, _root, info, **data):
        node_id = data.get("id")

        instance = cls.get_node_or_error(info, node_id, only_type=Initiative)
        variants_id = list(instance.variants.all().values_list("id", flat=True))

        cls.delete_assigned_attribute_values(instance)

        draft_order_lines_data = get_draft_order_lines_data_for_variants(variants_id)

        response = super().perform_mutation(_root, info, **data)

        # delete order lines for deleted variant
        order_models.OrderLine.objects.filter(
            pk__in=draft_order_lines_data.line_pks
        ).delete()

        # run order event for deleted lines
        for order, order_lines in draft_order_lines_data.order_to_lines_mapping.items():
            order_events.order_line_product_removed_event(
                order, info.context.user, info.context.app, order_lines
            )

        order_pks = draft_order_lines_data.order_pks
        if order_pks:
            recalculate_orders_task.delay(list(order_pks))
        transaction.on_commit(
            lambda: info.context.plugins.product_deleted(instance, variants_id)
        )

        return response

    @staticmethod
    def delete_assigned_attribute_values(instance):
        attribute_models.AttributeValue.objects.filter(
            productassignments__product_id=instance.id,
            attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES,
        ).delete()



class InitiativeMediaCreateInput(graphene.InputObjectType):
    alt = graphene.String(description="Alt text for a product media.")
    image = Upload(
        required=False, description="Represents an image file in a multipart request."
    )
    product = graphene.ID(
        required=True, description="ID of an product.", name="product"
    )
    media_url = graphene.String(
        required=False, description="Represents an URL to an external media."
    )


class InitiativeMediaCreate(BaseMutation):
    product = graphene.Field(Initiative)
    media = graphene.Field(InitiativeMedia)

    class Arguments:
        input = InitiativeMediaCreateInput(
            required=True, description="Fields required to create a product media."
        )

    class Meta:
        description = (
            "Create a media object (image or video URL) associated with product. "
            "For image, this mutation must be sent as a `multipart` request. "
            "More detailed specs of the upload format can be found here: "
            "https://github.com/jaydenseric/graphql-multipart-request-spec"
        )
        permissions = (InitiativePermissions.MANAGE_PRODUCTS,)
        error_type_class = InitiativeError
        error_type_field = "product_errors"

    @classmethod
    def validate_input(cls, data):
        image = data.get("image")
        media_url = data.get("media_url")

        if not image and not media_url:
            raise ValidationError(
                {
                    "input": ValidationError(
                        "Image or external URL is required.",
                        code=InitiativeErrorCode.REQUIRED,
                    )
                }
            )
        if image and media_url:
            raise ValidationError(
                {
                    "input": ValidationError(
                        "Either image or external URL is required.",
                        code=InitiativeErrorCode.DUPLICATED_INPUT_ITEM,
                    )
                }
            )

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        data = data.get("input")
        cls.validate_input(data)
        product = cls.get_node_or_error(
            info,
            data["product"],
            field="product",
            only_type=Initiative,
            qs=models.Initiative.objects.prefetched_for_webhook(),
        )

        alt = data.get("alt", "")
        image = data.get("image")
        media_url = data.get("media_url")
        if image:
            image_data = info.context.FILES.get(image)
            validate_image_file(image_data, "image", InitiativeErrorCode)
            add_hash_to_file_name(image_data)
            media = product.media.create(
                image=image_data, alt=alt, type=InitiativeMediaTypes.IMAGE
            )
        if media_url:
            # Remote URLs can point to the images or oembed data.
            # In case of images, file is downloaded. Otherwise we keep only
            # URL to remote media.
            if is_image_url(media_url):
                validate_image_url(media_url, "media_url", InitiativeErrorCode.INVALID)
                filename = get_filename_from_url(media_url)
                image_data = requests.get(media_url, stream=True)
                image_file = File(image_data.raw, filename)
                media = product.media.create(
                    image=image_file,
                    alt=alt,
                    type=InitiativeMediaTypes.IMAGE,
                )
            else:
                oembed_data, media_type = get_oembed_data(media_url, "media_url")
                media = product.media.create(
                    external_url=oembed_data["url"],
                    alt=oembed_data.get("title", alt),
                    type=media_type,
                    oembed_data=oembed_data,
                )

        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return InitiativeMediaCreate(product=product, media=media)


class InitiativeMediaUpdateInput(graphene.InputObjectType):
    alt = graphene.String(description="Alt text for a product media.")


class InitiativeMediaUpdate(BaseMutation):
    product = graphene.Field(Initiative)
    media = graphene.Field(InitiativeMedia)

    class Arguments:
        id = graphene.ID(required=True, description="ID of a product media to update.")
        input = InitiativeMediaUpdateInput(
            required=True, description="Fields required to update a product media."
        )

    class Meta:
        description = "Updates a product media."
        permissions = (InitiativePermissions.MANAGE_PRODUCTS,)
        error_type_class = InitiativeError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        media = cls.get_node_or_error(info, data.get("id"), only_type=InitiativeMedia)
        product = models.Initiative.objects.prefetched_for_webhook().get(
            pk=media.product_id
        )
        alt = data.get("input").get("alt")
        if alt is not None:
            media.alt = alt
            media.save(update_fields=["alt"])
        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return InitiativeMediaUpdate(product=product, media=media)


class InitiativeMediaReorder(BaseMutation):
    product = graphene.Field(Initiative)
    media = NonNullList(InitiativeMedia)

    class Arguments:
        product_id = graphene.ID(
            required=True,
            description="ID of product that media order will be altered.",
        )
        media_ids = NonNullList(
            graphene.ID,
            required=True,
            description="IDs of a product media in the desired order.",
        )

    class Meta:
        description = "Changes ordering of the product media."
        permissions = (InitiativePermissions.MANAGE_PRODUCTS,)
        error_type_class = InitiativeError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, product_id, media_ids):
        product = cls.get_node_or_error(
            info,
            product_id,
            field="product_id",
            only_type=Initiative,
            qs=models.Initiative.objects.prefetched_for_webhook(),
        )

        if len(media_ids) != product.media.count():
            raise ValidationError(
                {
                    "order": ValidationError(
                        "Incorrect number of media IDs provided.",
                        code=InitiativeErrorCode.INVALID,
                    )
                }
            )

        ordered_media = []
        for media_id in media_ids:
            media = cls.get_node_or_error(
                info, media_id, field="order", only_type=InitiativeMedia
            )
            if media and media.product != product:
                raise ValidationError(
                    {
                        "order": ValidationError(
                            "Media %(media_id)s does not belong to this product.",
                            code=InitiativeErrorCode.NOT_PRODUCTS_IMAGE,
                            params={"media_id": media_id},
                        )
                    }
                )
            ordered_media.append(media)

        update_ordered_media(ordered_media)

        info.context.plugins.product_updated(product)
        product = ChannelContext(node=product, channel_slug=None)
        return InitiativeMediaReorder(product=product, media=ordered_media)
