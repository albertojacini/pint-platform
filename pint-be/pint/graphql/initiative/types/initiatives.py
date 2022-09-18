# import sys
# from collections import defaultdict
# from dataclasses import asdict
# from typing import List, Optional

import graphene
# from django_countries.fields import Country
from graphene import relay

# from ....attribute import models as attribute_models
# from ....core.permissions import (
#     AuthorizationFilters,
#     OrderPermissions,
#     ProductPermissions,
#     has_one_of_permissions,
# )
from ....core.tracing import traced_resolver
# from ....core.utils import get_currency_for_country
# from ....core.weight import convert_weight_to_default_weight_unit
from ....initiative import models
# from ....product.models import ALL_PRODUCTS_PERMISSIONS
# from ....product.utils import calculate_revenue_for_variant
# from ....product.utils.availability import (
#     get_product_availability,
#     get_variant_availability,
# )
# from ....product.utils.variants import get_variant_selection_attributes
from ....thumbnail.utils import get_image_or_proxy_url, get_thumbnail_size
from ...account import types as account_types
# from ...account.enums import CountryCodeEnum
from ...core.connection import (
    CountableConnection,
    create_connection_slice,
    # filter_connection_queryset,
)
from ...core.descriptions import (
    # ADDED_IN_31,
    DEPRECATED_IN_3X_FIELD,
    # DEPRECATED_IN_3X_INPUT,
    # PREVIEW_FEATURE,
    RICH_CONTENT,
)
# from ...core.enums import ReportingPeriod
from ...core.federation import federated_entity, resolve_federation_references
from ...core.fields import (
    # ConnectionField,
    # FilterConnectionField,
    JSONString,
    # PermissionsField,
)
from ...core.types import (
    Image,
    ModelObjectType,
    # NonNullList,
    # TaxedMoney,
    # TaxedMoneyRange,
    # TaxType,
    ThumbnailField,
    # Weight,
)
# from ...core.utils import from_global_id_or_error

from ...meta.types import ObjectWithMetadata
from ...translations.fields import TranslationField
from ...translations.types import (
    InitiativeTranslation,
)
# from ...translations.types import (
#     ProductTranslation,
# )
from ...utils import get_user_or_app_from_context
from ..dataloaders import (
    # CategoryByIdLoader,
    # CategoryChildrenByCategoryIdLoader,
    # CollectionChannelListingByCollectionIdAndChannelSlugLoader,
    # CollectionChannelListingByCollectionIdLoader,
    # CollectionsByProductIdLoader,
    # ImagesByProductIdLoader,
    # ImagesByProductVariantIdLoader,
    # MediaByProductIdLoader,
    # MediaByProductVariantIdLoader,
    # ProductAttributesByProductTypeIdLoader,
    InitiativeByIdLoader,
    # ProductByIdLoader,
    # ProductChannelListingByProductIdAndChannelSlugLoader,
    # ProductChannelListingByProductIdLoader,
    # ProductTypeByIdLoader,
    # ProductVariantByIdLoader,
    # ProductVariantsByProductIdLoader,
    # SelectedAttributesByProductIdLoader,
    # SelectedAttributesByProductVariantIdLoader,
    # ThumbnailByCategoryIdSizeAndFormatLoader,
    # ThumbnailByCollectionIdSizeAndFormatLoader,
    ThumbnailByInitiativeMediaIdSizeAndFormatLoader,
    # VariantAttributesByProductTypeIdLoader,
    # VariantChannelListingByVariantIdAndChannelSlugLoader,
    # VariantChannelListingByVariantIdLoader,
    # VariantsChannelListingByProductIdAndChannelSlugLoader,
)
# from ..enums import InitiativeMediaType, ProductTypeKindEnum, VariantAttributeScope
# from ..filters import ProductFilterInput
# from ..resolvers import resolve_product_variants, resolve_products
# from ..sorters import ProductOrder

# destination_address_argument = graphene.Argument(
#     account_types.AddressInput,
#     description=(
#         "Destination address used to find warehouses where stock availability "
#         "for this product is checked. If address is empty, uses "
#         "`Shop.companyAddress` or fallbacks to server's "
#         "`settings.DEFAULT_COUNTRY` configuration."
#     ),
# )


@federated_entity("id channel")
class Initiative(ModelObjectType):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    title = graphene.String(required=True)
    description_json = JSONString(
        description="Description of the initiative." + RICH_CONTENT,
        deprecation_reason=(
            f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
        ),
    )
    thumbnail = ThumbnailField()
    # is_available = graphene.Boolean(
    #     address=destination_address_argument,
    #     description="Whether the initiative is in stock and visible or not.",
    # )

    # translation = TranslationField(
    #     InitiativeTranslation,
    #     type_name="initiative",
    #     resolver=ChannelContextType.resolve_translation,
    # )

    class Meta:
        # default_resolver = ChannelContextType.resolver_with_context
        description = "Represents an individual item for sale in the storefront."
        interfaces = [relay.Node, ObjectWithMetadata]
        model = models.Initiative

    # @staticmethod
    # def resolve_created(root: ChannelContext[models.Initiative], _info):
    #     created_at = root.node.created_at
    #     return created_at
    #
    # @staticmethod
    # def resolve_description_json(root: ChannelContext[models.Initiative], _info):
    #     description = root.node.description
    #     return description if description is not None else {}

    # @staticmethod
    # @traced_resolver
    # def resolve_thumbnail(
    #     root: ChannelContext[models.Initiative], info, *, size=256, format=None
    # ):
    #     format = format.lower() if format else None
    #     size = get_thumbnail_size(size)
    #
    #     def return_first_thumbnail(initiative_media):
    #         if not initiative_media:
    #             return None
    #
    #         image = initiative_media[0]
    #         oembed_data = image.oembed_data
    #
    #         if oembed_data.get("thumbnail_url"):
    #             return Image(alt=oembed_data["title"], url=oembed_data["thumbnail_url"])
    #
    #         def _resolve_url(thumbnail):
    #             url = get_image_or_proxy_url(
    #                 thumbnail, image.id, "InitiativeMedia", size, format
    #             )
    #             return Image(alt=image.alt, url=info.context.build_absolute_uri(url))
    #
    #         return (
    #             ThumbnailByInitiativeMediaIdSizeAndFormatLoader(info.context)
    #             .load((image.id, size, format))
    #             .then(_resolve_url)
    #         )
    #
    #     return (
    #         MediaByInitiativeIdLoader(info.context)
    #         .load(root.node.id)
    #         .then(return_first_thumbnail)
    #     )

    @staticmethod
    def resolve_url(_root, _info):
        return ""

    # @staticmethod
    # def resolve_media_by_id(root: ChannelContext[models.Product], _info, *, id):
    #     _type, pk = from_global_id_or_error(id, ProductMedia)
    #     return root.node.media.filter(pk=pk).first()
    #
    # @staticmethod
    # def resolve_image_by_id(root: ChannelContext[models.Product], _info, *, id):
    #     _type, pk = from_global_id_or_error(id, ProductImage)
    #     return root.node.media.filter(pk=pk).first()

    # @staticmethod
    # def resolve_media(root: ChannelContext[models.Initiative], info):
    #     return MediaByInitiativeIdLoader(info.context).load(root.node.id)
    #
    # @staticmethod
    # def resolve_images(root: ChannelContext[models.Initiative], info):
    #     return ImagesByInitiativeIdLoader(info.context).load(root.node.id)




class InitiativeCountableConnection(CountableConnection):
    class Meta:
        node = Initiative


# @federated_entity("id")
# class InitiativeType(ModelObjectType):
#     id = graphene.GlobalID(required=True)
#     name = graphene.String(required=True)
#     slug = graphene.String(required=True)
#
#     class Meta:
#         description = (
#             "Represents a type of product. It defines what attributes are available to "
#             "products of this type."
#         )
#         interfaces = [relay.Node, ObjectWithMetadata]
#         model = models.ProductType
#
#     @staticmethod
#     def resolve_initiatives(root: models.InitiativeType, info, *, channel=None, **kwargs):
#         requestor = get_user_or_app_from_context(info.context)
#         qs = root.initiatives.visible_to_user(requestor, channel)  # type: ignore
#         return create_connection_slice(qs, info, kwargs, InitiativeCountableConnection)
#
#
# class InitiativeTypeCountableConnection(CountableConnection):
#     class Meta:
#         node = InitiativeType


# @federated_entity("id channel")
# class Collection(ChannelContextTypeWithMetadata, ModelObjectType):
#     id = graphene.GlobalID(required=True)
#     seo_title = graphene.String()
#     seo_description = graphene.String()
#     name = graphene.String(required=True)
#     description = JSONString(
#         description="Description of the collection." + RICH_CONTENT
#     )
#     slug = graphene.String(required=True)
#     channel = graphene.String(
#         description=(
#             "Channel given to retrieve this collection. Also used by federation "
#             "gateway to resolve this object in a federated query."
#         ),
#     )
#     description_json = JSONString(
#         description="Description of the collection." + RICH_CONTENT,
#         deprecation_reason=(
#             f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
#         ),
#     )
#     products = FilterConnectionField(
#         ProductCountableConnection,
#         filter=ProductFilterInput(description="Filtering options for products."),
#         sort_by=ProductOrder(description="Sort products."),
#         description="List of products in this collection.",
#     )
#     background_image = ThumbnailField()
#     translation = TranslationField(
#         CollectionTranslation,
#         type_name="collection",
#         resolver=ChannelContextType.resolve_translation,
#     )
#     channel_listings = PermissionsField(
#         NonNullList(CollectionChannelListing),
#         description="List of channels in which the collection is available.",
#         permissions=[
#             ProductPermissions.MANAGE_PRODUCTS,
#         ],
#     )
#
#     class Meta:
#         default_resolver = ChannelContextType.resolver_with_context
#         description = "Represents a collection of products."
#         interfaces = [relay.Node, ObjectWithMetadata]
#         model = models.Collection
#
#     @staticmethod
#     def resolve_channel(root: ChannelContext[models.Product], _info):
#         return root.channel_slug
#
#     @staticmethod
#     def resolve_background_image(
#         root: ChannelContext[models.Collection], info, size=None, format=None
#     ):
#         node = root.node
#         if not node.background_image:
#             return
#
#         alt = node.background_image_alt
#         if not size:
#             return Image(url=node.background_image.url, alt=alt)
#
#         format = format.lower() if format else None
#         size = get_thumbnail_size(size)
#
#         def _resolve_background_image(thumbnail):
#             url = get_image_or_proxy_url(thumbnail, node.id, "Collection", size, format)
#             return Image(url=url, alt=alt)
#
#         return (
#             ThumbnailByCollectionIdSizeAndFormatLoader(info.context)
#             .load((node.id, size, format))
#             .then(_resolve_background_image)
#         )
#
#     @staticmethod
#     def resolve_products(root: ChannelContext[models.Collection], info, **kwargs):
#         requestor = get_user_or_app_from_context(info.context)
#         qs = root.node.products.visible_to_user(  # type: ignore
#             requestor, root.channel_slug
#         )
#         qs = ChannelQsContext(qs=qs, channel_slug=root.channel_slug)
#
#         kwargs["channel"] = root.channel_slug
#         qs = filter_connection_queryset(qs, kwargs)
#         return create_connection_slice(qs, info, kwargs, ProductCountableConnection)
#
#     @staticmethod
#     def resolve_channel_listings(root: ChannelContext[models.Collection], info):
#         return CollectionChannelListingByCollectionIdLoader(info.context).load(
#             root.node.id
#         )
#
#     @staticmethod
#     def resolve_description_json(root: ChannelContext[models.Collection], _info):
#         description = root.node.description
#         return description if description is not None else {}
#
#     @staticmethod
#     def __resolve_references(roots: List["Collection"], info):
#         from ..resolvers import resolve_collections
#
#         channels = defaultdict(set)
#         roots_ids = []
#         for root in roots:
#             _, root_id = from_global_id_or_error(root.id, Collection, raise_error=True)
#             roots_ids.append(f"{root.channel}_{root_id}")
#             channels[root.channel].add(root_id)
#
#         collections = {}
#         for channel, ids in channels.items():
#             queryset = resolve_collections(info, channel).qs.filter(id__in=ids)
#
#             for collection in queryset:
#                 collections[f"{channel}_{collection.id}"] = ChannelContext(
#                     channel_slug=channel, node=collection
#                 )
#
#         return [collections.get(root_id) for root_id in roots_ids]
#
#
# class CollectionCountableConnection(CountableConnection):
#     class Meta:
#         node = Collection


# @federated_entity("id")
# class Category(ModelObjectType):
#     id = graphene.GlobalID(required=True)
#     seo_title = graphene.String()
#     seo_description = graphene.String()
#     name = graphene.String(required=True)
#     description = JSONString(description="Description of the category." + RICH_CONTENT)
#     slug = graphene.String(required=True)
#     parent = graphene.Field(lambda: Category)
#     level = graphene.Int(required=True)
#     description_json = JSONString(
#         description="Description of the category." + RICH_CONTENT,
#         deprecation_reason=(
#             f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
#         ),
#     )
#     ancestors = ConnectionField(
#         lambda: CategoryCountableConnection,
#         description="List of ancestors of the category.",
#     )
#     products = ConnectionField(
#         ProductCountableConnection,
#         channel=graphene.String(
#             description="Slug of a channel for which the data should be returned."
#         ),
#         description=(
#             "List of products in the category. Requires the following permissions to "
#             "include the unpublished items: "
#             f"{', '.join([p.name for p in ALL_PRODUCTS_PERMISSIONS])}."
#         ),
#     )
#     children = ConnectionField(
#         lambda: CategoryCountableConnection,
#         description="List of children of the category.",
#     )
#     background_image = ThumbnailField()
#     translation = TranslationField(CategoryTranslation, type_name="category")
#
#     class Meta:
#         description = (
#             "Represents a single category of products. Categories allow to organize "
#             "products in a tree-hierarchies which can be used for navigation in the "
#             "storefront."
#         )
#         interfaces = [relay.Node, ObjectWithMetadata]
#         model = models.Category
#
#     @staticmethod
#     def resolve_ancestors(root: models.Category, info, **kwargs):
#         return create_connection_slice(
#             root.get_ancestors(), info, kwargs, CategoryCountableConnection
#         )
#
#     @staticmethod
#     def resolve_description_json(root: models.Category, _info):
#         description = root.description
#         return description if description is not None else {}
#
#     @staticmethod
#     def resolve_background_image(root: models.Category, info, size=None, format=None):
#         if not root.background_image:
#             return
#
#         alt = root.background_image_alt
#         if not size:
#             return Image(url=root.background_image.url, alt=alt)
#
#         format = format.lower() if format else None
#         size = get_thumbnail_size(size)
#
#         def _resolve_background_image(thumbnail):
#             url = get_image_or_proxy_url(thumbnail, root.id, "Category", size, format)
#             return Image(url=url, alt=alt)
#
#         return (
#             ThumbnailByCategoryIdSizeAndFormatLoader(info.context)
#             .load((root.id, size, format))
#             .then(_resolve_background_image)
#         )
#
#     @staticmethod
#     def resolve_children(root: models.Category, info, **kwargs):
#         def slice_children_categories(children):
#             return create_connection_slice(
#                 children, info, kwargs, CategoryCountableConnection
#             )
#
#         return (
#             CategoryChildrenByCategoryIdLoader(info.context)
#             .load(root.pk)
#             .then(slice_children_categories)
#         )
#
#     @staticmethod
#     def resolve_url(root: models.Category, _info):
#         return ""
#
#     @staticmethod
#     @traced_resolver
#     def resolve_products(root: models.Category, info, *, channel=None, **kwargs):
#         requestor = get_user_or_app_from_context(info.context)
#         has_required_permissions = has_one_of_permissions(
#             requestor, ALL_PRODUCTS_PERMISSIONS
#         )
#         tree = root.get_descendants(include_self=True)
#         if channel is None and not has_required_permissions:
#             channel = get_default_channel_slug_or_graphql_error()
#         qs = models.Product.objects.all()
#         if not has_required_permissions:
#             qs = (
#                 qs.visible_to_user(requestor, channel)
#                 .annotate_visible_in_listings(channel)
#                 .exclude(
#                     visible_in_listings=False,
#                 )
#             )
#         if channel and has_required_permissions:
#             qs = qs.filter(channel_listings__channel__slug=channel)
#         qs = qs.filter(category__in=tree)
#         qs = ChannelQsContext(qs=qs, channel_slug=channel)
#         return create_connection_slice(qs, info, kwargs, ProductCountableConnection)
#
#     @staticmethod
#     def __resolve_references(roots: List["Category"], _info):
#         return resolve_federation_references(Category, roots, models.Category.objects)
#
#
# class CategoryCountableConnection(CountableConnection):
#     class Meta:
#         node = Category


# @federated_entity("id")
# class ProductMedia(ModelObjectType):
#     id = graphene.GlobalID(required=True)
#     sort_order = graphene.Int()
#     alt = graphene.String(required=True)
#     type = ProductMediaType(required=True)
#     oembed_data = JSONString(required=True)
#     url = ThumbnailField(graphene.String, required=True)
#
#     class Meta:
#         description = "Represents a product media."
#         interfaces = [relay.Node]
#         model = models.ProductMedia
#
#     @staticmethod
#     def resolve_url(root: models.ProductMedia, info, *, size=None, format=None):
#         if root.external_url:
#             return root.external_url
#
#         if not root.image:
#             return
#
#         if not size:
#             return info.context.build_absolute_uri(root.image.url)
#
#         format = format.lower() if format else None
#         size = get_thumbnail_size(size)
#
#         def _resolve_url(thumbnail):
#             url = get_image_or_proxy_url(
#                 thumbnail, root.id, "ProductMedia", size, format
#             )
#             return info.context.build_absolute_uri(url)
#
#         return (
#             ThumbnailByProductMediaIdSizeAndFormatLoader(info.context)
#             .load((root.id, size, format))
#             .then(_resolve_url)
#         )
#
#     @staticmethod
#     def __resolve_references(roots: List["ProductMedia"], _info):
#         return resolve_federation_references(
#             ProductMedia, roots, models.ProductMedia.objects
#         )
#
#
# class ProductImage(graphene.ObjectType):
#     id = graphene.ID(required=True, description="The ID of the image.")
#     alt = graphene.String(description="The alt text of the image.")
#     sort_order = graphene.Int(
#         required=False,
#         description=(
#             "The new relative sorting position of the item (from -inf to +inf). "
#             "1 moves the item one position forward, -1 moves the item one position "
#             "backward, 0 leaves the item unchanged."
#         ),
#     )
#     url = ThumbnailField(graphene.String, required=True)
#
#     class Meta:
#         description = "Represents a product image."
#
#     @staticmethod
#     def resolve_id(root: models.ProductMedia, info):
#         return graphene.Node.to_global_id("ProductImage", root.id)
#
#     @staticmethod
#     def resolve_url(root: models.ProductMedia, info, *, size=None, format=None):
#         if not root.image:
#             return
#
#         if not size:
#             return info.context.build_absolute_uri(root.image.url)
#
#         format = format.lower() if format else None
#         size = get_thumbnail_size(size)
#
#         def _resolve_url(thumbnail):
#             url = get_image_or_proxy_url(
#                 thumbnail, root.id, "ProductMedia", size, format
#             )
#             return info.context.build_absolute_uri(url)
#
#         return (
#             ThumbnailByProductMediaIdSizeAndFormatLoader(info.context)
#             .load((root.id, size, format))
#             .then(_resolve_url)
#         )
