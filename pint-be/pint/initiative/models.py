import datetime
from typing import TYPE_CHECKING, Iterable, Optional, Union
from uuid import uuid4
#
import graphene
import pytz
from django.conf import settings
from django.contrib.postgres.aggregates import StringAgg
from django.contrib.postgres.indexes import BTreeIndex, GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.core.validators import MinValueValidator
from django.db import models, transaction
from django.db.models import JSONField  # type: ignore
from django.db.models import (
    BooleanField,
    Case,
    Count,
    DateTimeField,
    Exists,
    ExpressionWrapper,
    F,
    FilteredRelation,
    OuterRef,
    Q,
    Subquery,
    Sum,
    TextField,
    Value,
    When,
)
from django.db.models.functions import Coalesce
from django.urls import reverse
from django.utils import timezone
from django.utils.encoding import smart_text
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from measurement.measures import Weight
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from prices import Money
#
# from ..core.db.fields import SanitizedJSONField
from ..core.models import ModelWithMetadata, PublishableModel, SortableModel
from ..core.permissions import (
    # DiscountPermissions,
    # OrderPermissions,
    # ProductPermissions,
    # ProductTypePermissions,
    has_one_of_permissions,
)
# from ..core.utils import build_absolute_uri
# from ..core.utils.draftjs import json_content_to_raw_text
# from ..core.utils.editorjs import clean_editor_js
from ..core.utils.translations import Translation, TranslationProxy
from ..seo.models import SeoModel, SeoModelTranslation
# from . import ProductMediaTypes, ProductTypeKind
from . import InitiativeMediaTypes

# if TYPE_CHECKING:
#     # flake8: noqa
#     from decimal import Decimal
#
#     from django.db.models import OrderBy
#
#     from ..account.models import User
#     from ..app.models import App

ALL_INITIATIVES_PERMISSIONS = [
    # List of permissions, where each of them allows viewing all products
    # (including unpublished).
    # OrderPermissions.MANAGE_ORDERS,
    # DiscountPermissions.MANAGE_DISCOUNTS,
    # ProductPermissions.MANAGE_PRODUCTS,
]
class InitiativesQueryset(models.QuerySet):
    # def published(self, channel_slug: str):
    #     today = datetime.datetime.now(pytz.UTC)
    #     channels = Channel.objects.filter(
    #         slug=str(channel_slug), is_active=True
    #     ).values("id")
    #     channel_listings = Initiative.objects.filter(
    #         Q(published_at__lte=today) | Q(published_at__isnull=True),
    #         Exists(channels.filter(pk=OuterRef("channel_id"))),
    #         is_published=True,
    #     ).values("id")
    #     return self.filter(Exists(channel_listings.filter(product_id=OuterRef("pk"))))

    # def not_published(self, channel_slug: str):
    #     today = datetime.datetime.now(pytz.UTC)
    #     return self.annotate_publication_info(channel_slug).filter(
    #         Q(published_at__gt=today) & Q(is_published=True)
    #         | Q(is_published=False)
    #         | Q(is_published__isnull=True)
    #     )

    def visible_to_user(self, requestor: Union["User", "App"], channel_slug: str):
        if has_one_of_permissions(requestor, ALL_INITIATIVES_PERMISSIONS):
            # if channel_slug:
            #     channels = Channel.objects.filter(slug=str(channel_slug)).values("id")
            #     channel_listings = ProductChannelListing.objects.filter(
            #         Exists(channels.filter(pk=OuterRef("channel_id")))
            #     ).values("id")
            #     return self.filter(
            #         Exists(channel_listings.filter(product_id=OuterRef("pk")))
            #     )
            return self.all()
        return self.published_with_variants(channel_slug)

    # def annotate_publication_info(self, channel_slug: str):
    #     return self.annotate_is_published(channel_slug).annotate_published_at(
    #         channel_slug
    #     )

    # def annotate_is_published(self, channel_slug: str):
    #     query = Subquery(
    #         ProductChannelListing.objects.filter(
    #             product_id=OuterRef("pk"), channel__slug=str(channel_slug)
    #         ).values_list("is_published")[:1]
    #     )
    #     return self.annotate(
    #         is_published=ExpressionWrapper(query, output_field=BooleanField())
    #     )
    #
    # def annotate_published_at(self, channel_slug: str):
    #     query = Subquery(
    #         ProductChannelListing.objects.filter(
    #             product_id=OuterRef("pk"), channel__slug=str(channel_slug)
    #         ).values_list("published_at")[:1]
    #     )
    #     return self.annotate(
    #         published_at=ExpressionWrapper(query, output_field=DateTimeField())
    #     )

    # def annotate_visible_in_listings(self, channel_slug):
    #     query = Subquery(
    #         ProductChannelListing.objects.filter(
    #             product_id=OuterRef("pk"), channel__slug=str(channel_slug)
    #         ).values_list("visible_in_listings")[:1]
    #     )
    #     return self.annotate(
    #         visible_in_listings=ExpressionWrapper(query, output_field=BooleanField())
    #     )

    # def sort_by_attribute(
    #     self, attribute_pk: Union[int, str], descending: bool = False
    # ):
    #     """Sort a query set by the values of the given product attribute.
    #
    #     :param attribute_pk: The database ID (must be a numeric) of the attribute
    #                          to sort by.
    #     :param descending: The sorting direction.
    #     """
    #     from ..attribute.models import AttributeProduct, AttributeValue
    #
    #     qs: models.QuerySet = self
    #     # If the passed attribute ID is valid, execute the sorting
    #     if not (isinstance(attribute_pk, int) or attribute_pk.isnumeric()):
    #         return qs.annotate(
    #             concatenated_values_order=Value(
    #                 None, output_field=models.IntegerField()
    #             ),
    #             concatenated_values=Value(None, output_field=models.CharField()),
    #         )
    #
    #     # Retrieve all the products' attribute data IDs (assignments) and
    #     # product types that have the given attribute associated to them
    #     associated_values = tuple(
    #         AttributeProduct.objects.filter(attribute_id=attribute_pk).values_list(
    #             "pk", "product_type_id"
    #         )
    #     )
    #
    #     if not associated_values:
    #         qs = qs.annotate(
    #             concatenated_values_order=Value(
    #                 None, output_field=models.IntegerField()
    #             ),
    #             concatenated_values=Value(None, output_field=models.CharField()),
    #         )
    #
    #     else:
    #         attribute_associations, product_types_associated_to_attribute = zip(
    #             *associated_values
    #         )
    #
    #         qs = qs.annotate(
    #             # Contains to retrieve the attribute data (singular) of each product
    #             # Refer to `AttributeProduct`.
    #             filtered_attribute=FilteredRelation(
    #                 relation_name="attributes",
    #                 condition=Q(attributes__assignment_id__in=attribute_associations),
    #             ),
    #             # Implicit `GROUP BY` required for the `StringAgg` aggregation
    #             grouped_ids=Count("id"),
    #             # String aggregation of the attribute's values to efficiently sort them
    #             concatenated_values=Case(
    #                 # If the product has no association data but has
    #                 # the given attribute associated to its product type,
    #                 # then consider the concatenated values as empty (non-null).
    #                 When(
    #                     Q(product_type_id__in=product_types_associated_to_attribute)
    #                     & Q(filtered_attribute=None),
    #                     then=models.Value(""),
    #                 ),
    #                 default=StringAgg(
    #                     F("filtered_attribute__values__name"),
    #                     delimiter=",",
    #                     ordering=(
    #                         [
    #                             f"filtered_attribute__values__{field_name}"
    #                             for field_name in AttributeValue._meta.ordering or []
    #                         ]
    #                     ),
    #                 ),
    #                 output_field=models.CharField(),
    #             ),
    #             concatenated_values_order=Case(
    #                 # Make the products having no such attribute be last in the sorting
    #                 When(concatenated_values=None, then=2),
    #                 # Put the products having an empty attribute value at the bottom of
    #                 # the other products.
    #                 When(concatenated_values="", then=1),
    #                 # Put the products having an attribute value to be always at the top
    #                 default=0,
    #                 output_field=models.IntegerField(),
    #             ),
    #         )
    #
    #     # Sort by concatenated_values_order then
    #     # Sort each group of products (0, 1, 2, ...) per attribute values
    #     # Sort each group of products by name,
    #     # if they have the same values or not values
    #     ordering = "-" if descending else ""
    #     return qs.order_by(
    #         f"{ordering}concatenated_values_order",
    #         f"{ordering}concatenated_values",
    #         f"{ordering}name",
    #     )

    def prefetched_for_webhook(self, single_object=True):
        common_fields = (
            # "attributes__values",
            # "attributes__assignment__attribute",
            "media",
            # "variants__attributes__values",
            # "variants__attributes__assignment__attribute",
            # "variants__variant_media__media",
            # "variants__stocks__allocations",
            # "variants__channel_listings__channel",
            # "channel_listings__channel",
        )
        if single_object:
            return self.prefetch_related(*common_fields)
        # return self.prefetch_related("collections", "category", *common_fields)
        return self.prefetch_related(*common_fields)


class Initiative(SeoModel, ModelWithMetadata):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    # description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)
    # description_plaintext = TextField(blank=True)
    # search_document = models.TextField(blank=True, default="")
    # search_vector = SearchVectorField(blank=True, null=True)
    # search_index_dirty = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    objects = models.Manager.from_queryset(InitiativesQueryset)()
    translated = TranslationProxy()

    class Meta:
        app_label = "initiative"
        ordering = ("slug",)
        # permissions = (
        #     (ProductPermissions.MANAGE_PRODUCTS.codename, "Manage products."),
        # )
        # indexes = [
        #     GinIndex(
        #         name="product_search_gin",
        #         fields=["search_document"],
        #         opclasses=["gin_trgm_ops"],
        #     ),
        #     GinIndex(
        #         name="product_tsearch",
        #         fields=["search_vector"],
        #     ),
        # ]
        # indexes.extend(ModelWithMetadata.Meta.indexes)

    def __str__(self) -> str:
        return self.title


class InitiativeMedia(SortableModel):
    product = models.ForeignKey(
        Initiative,
        related_name="media",
        on_delete=models.CASCADE,
        # DEPRECATED
        null=True,
        blank=True,
    )
    image = models.ImageField(upload_to="products", blank=True, null=True)
    alt = models.CharField(max_length=128, blank=True)
    type = models.CharField(
        max_length=32,
        choices=InitiativeMediaTypes.CHOICES,
        default=InitiativeMediaTypes.IMAGE,
    )
    external_url = models.CharField(max_length=256, blank=True, null=True)
    oembed_data = JSONField(blank=True, default=dict)
    # DEPRECATED
    to_remove = models.BooleanField(default=False)

    class Meta:
        ordering = ("sort_order", "pk")
        app_label = "product"

    def get_ordering_queryset(self):
        return self.product.media.all()

    @transaction.atomic
    def delete(self, *args, **kwargs):
        super(SortableModel, self).delete(*args, **kwargs)
