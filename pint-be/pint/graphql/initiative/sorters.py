import graphene
from django.db.models import (
    BooleanField,
    Count,
    DateTimeField,
    ExpressionWrapper,
    F,
    IntegerField,
    Min,
    OuterRef,
    Q,
    QuerySet,
    Subquery,
)
from django.db.models.expressions import Window
from django.db.models.functions import Coalesce, DenseRank

from ...initiative.models import (
    # Category,
    # CollectionChannelListing,
    Initiative,
    # InitiativeChannelListing,
)
from ..core.descriptions import CHANNEL_REQUIRED, DEPRECATED_IN_3X_INPUT
from ..core.types import ChannelSortInputObjectType, SortInputObjectType


# class CategorySortField(graphene.Enum):
#     NAME = ["name", "slug"]
#     INITIATIVE_COUNT = ["initiative_count", "name", "slug"]
#     SUBCATEGORY_COUNT = ["subcategory_count", "name", "slug"]
#
#     @property
#     def description(self):
#         # pylint: disable=no-member
#         if self in [
#             CategorySortField.NAME,
#             CategorySortField.INITIATIVE_COUNT,
#             CategorySortField.SUBCATEGORY_COUNT,
#         ]:
#             sort_name = self.name.lower().replace("_", " ")
#             return f"Sort categories by {sort_name}."
#         raise ValueError("Unsupported enum value: %s" % self.value)
#
#     @staticmethod
#     def qs_with_initiative_count(queryset: QuerySet, **_kwargs) -> QuerySet:
#         return queryset.annotate(
#             initiative_count=Coalesce(
#                 Subquery(
#                     Category.tree.add_related_count(
#                         queryset, Initiative, "category", "p_c", cumulative=True
#                     )
#                     .values("p_c")
#                     .filter(pk=OuterRef("pk"))[:1]
#                 ),
#                 0,
#                 output_field=IntegerField(),
#             )
#         )
#
#     @staticmethod
#     def qs_with_subcategory_count(queryset: QuerySet, **_kwargs) -> QuerySet:
#         return queryset.annotate(subcategory_count=Count("children__id"))
#
#
# class CategorySortingInput(ChannelSortInputObjectType):
#     class Meta:
#         sort_enum = CategorySortField
#         type_name = "categories"
#
#
# class CollectionSortField(graphene.Enum):
#     NAME = ["name", "slug"]
#     AVAILABILITY = ["is_published", "slug"]
#     INITIATIVE_COUNT = ["initiative_count", "slug"]
#     PUBLICATION_DATE = ["published_at", "slug"]
#     PUBLISHED_AT = ["published_at", "slug"]
#
#     @property
#     def description(self):
#         descrption_extras = {
#             CollectionSortField.AVAILABILITY.name: [CHANNEL_REQUIRED],
#             CollectionSortField.PUBLICATION_DATE.name: [
#                 CHANNEL_REQUIRED,
#                 DEPRECATED_IN_3X_INPUT,
#             ],
#             CollectionSortField.PUBLISHED_AT.name: [CHANNEL_REQUIRED],
#         }
#         if self.name in CollectionSortField.__enum__._member_names_:
#             sort_name = self.name.lower().replace("_", " ")
#             description = f"Sort collections by {sort_name}."
#             if extras := descrption_extras.get(self.name):
#                 description += "".join(extras)
#             return description
#         raise ValueError("Unsupported enum value: %s" % self.value)
#
#     @staticmethod
#     def qs_with_initiative_count(queryset: QuerySet, **_kwargs) -> QuerySet:
#         return queryset.annotate(initiative_count=Count("collectioninitiative__id"))
#
#     @staticmethod
#     def qs_with_availability(queryset: QuerySet, channel_slug: str) -> QuerySet:
#         subquery = Subquery(
#             CollectionChannelListing.objects.filter(
#                 collection_id=OuterRef("pk"), channel__slug=str(channel_slug)
#             ).values_list("is_published")[:1]
#         )
#         return queryset.annotate(
#             is_published=ExpressionWrapper(subquery, output_field=BooleanField())
#         )
#
#     @staticmethod
#     def qs_with_publication_date(queryset: QuerySet, channel_slug: str) -> QuerySet:
#         return CollectionSortField.qs_with_published_at(queryset, channel_slug)
#
#     @staticmethod
#     def qs_with_published_at(queryset: QuerySet, channel_slug: str) -> QuerySet:
#         subquery = Subquery(
#             CollectionChannelListing.objects.filter(
#                 collection_id=OuterRef("pk"), channel__slug=str(channel_slug)
#             ).values_list("published_at")[:1]
#         )
#         return queryset.annotate(
#             published_at=ExpressionWrapper(subquery, output_field=DateTimeField())
#         )
#
#
# class CollectionSortingInput(ChannelSortInputObjectType):
#     class Meta:
#         sort_enum = CollectionSortField
#         type_name = "collections"


class InitiativeOrderField(graphene.Enum):
    NAME = ["title", "slug"]
    RANK = ["search_rank", "id"]
    # PRICE = ["min_variants_price_amount", "name", "slug"]
    # MINIMAL_PRICE = ["discounted_price_amount", "name", "slug"]
    LAST_MODIFIED = ["updated_at", "name", "slug"]
    DATE = ["updated_at", "name", "slug"]
    # TYPE = ["initiative_type__name", "name", "slug"]
    # PUBLISHED = ["is_published", "name", "slug"]
    # PUBLICATION_DATE = ["published_at", "name", "slug"]
    # PUBLISHED_AT = ["published_at", "name", "slug"]
    LAST_MODIFIED_AT = ["updated_at", "name", "slug"]
    # COLLECTION = ["collectioninitiative__sort_order", "pk"]
    # RATING = ["rating", "name", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            # InitiativeOrderField.COLLECTION.name: (
            #     "collection. Note: "
            #     "This option is available only for the `Collection.initiatives` query."
            #     + CHANNEL_REQUIRED
            # ),
            InitiativeOrderField.RANK.name: (
                "rank. Note: This option is available only with the `search` filter."
            ),
            InitiativeOrderField.NAME.title: "name.",
            # InitiativeOrderField.PRICE.name: ("price." + CHANNEL_REQUIRED),
            # InitiativeOrderField.TYPE.name: "type.",
            # InitiativeOrderField.MINIMAL_PRICE.name: (
            #     "a minimal price of a initiative's variant." + CHANNEL_REQUIRED
            # ),
            InitiativeOrderField.DATE.name: f"update date. {DEPRECATED_IN_3X_INPUT}",
            # InitiativeOrderField.PUBLISHED.name: (
            #     "publication status." + CHANNEL_REQUIRED
            # ),
            # InitiativeOrderField.PUBLICATION_DATE.name: (
            #     "publication date." + CHANNEL_REQUIRED + DEPRECATED_IN_3X_INPUT
            # ),
            InitiativeOrderField.LAST_MODIFIED.name: (
                f"update date. {DEPRECATED_IN_3X_INPUT}"
            ),
            # InitiativeOrderField.PUBLISHED_AT.name: (
            #     "publication date." + CHANNEL_REQUIRED
            # ),
            InitiativeOrderField.LAST_MODIFIED_AT.name: "update date.",
            # InitiativeOrderField.RATING.name: "rating.",
        }
        if self.name in descriptions:
            return f"Sort initiatives by {descriptions[self.name]}"
        raise ValueError("Unsupported enum value: %s" % self.value)

    # @staticmethod
    # def qs_with_price(queryset: QuerySet, channel_slug: str) -> QuerySet:
    #     return queryset.annotate(
    #         min_variants_price_amount=Min(
    #             "variants__channel_listings__price_amount",
    #             filter=Q(variants__channel_listings__channel__slug=str(channel_slug))
    #             & Q(variants__channel_listings__price_amount__isnull=False),
    #         )
    #     )

    # @staticmethod
    # def qs_with_minimal_price(queryset: QuerySet, channel_slug: str) -> QuerySet:
    #     return queryset.annotate(
    #         discounted_price_amount=Min(
    #             "channel_listings__discounted_price_amount",
    #             filter=Q(channel_listings__channel__slug=str(channel_slug)),
    #         )
    #     )

    # @staticmethod
    # def qs_with_published(queryset: QuerySet, channel_slug: str) -> QuerySet:
    #     subquery = Subquery(
    #         InitiativeChannelListing.objects.filter(
    #             initiative_id=OuterRef("pk"), channel__slug=str(channel_slug)
    #         ).values_list("is_published")[:1]
    #     )
    #     return queryset.annotate(
    #         is_published=ExpressionWrapper(subquery, output_field=BooleanField())
    #     )

    # @staticmethod
    # def qs_with_publication_date(queryset: QuerySet, channel_slug: str) -> QuerySet:
    #     return InitiativeOrderField.qs_with_published_at(queryset, channel_slug)

    # @staticmethod
    # def qs_with_published_at(queryset: QuerySet, channel_slug: str) -> QuerySet:
    #     subquery = Subquery(
    #         InitiativeChannelListing.objects.filter(
    #             initiative_id=OuterRef("pk"), channel__slug=str(channel_slug)
    #         ).values_list("published_at")[:1]
    #     )
    #     return queryset.annotate(
    #         published_at=ExpressionWrapper(subquery, output_field=DateTimeField())
    #     )

    # @staticmethod
    # def qs_with_collection(queryset: QuerySet, **_kwargs) -> QuerySet:
    #     return queryset.annotate(
    #         sort_order=Window(
    #             expression=DenseRank(),
    #             order_by=(
    #                 F("collectioninitiative__sort_order").asc(nulls_last=True),
    #                 F("collectioninitiative__id"),
    #             ),
    #         )
    #     )


class InitiativeOrder(ChannelSortInputObjectType):
    attribute_id = graphene.Argument(
        graphene.ID,
        description=(
            "Sort initiative by the selected attribute's values.\n"
            "Note: this doesn't take translations into account yet."
        ),
    )
    field = graphene.Argument(
        InitiativeOrderField, description="Sort initiatives by the selected field."
    )

    class Meta:
        sort_enum = InitiativeOrderField


class InitiativeVariantSortField(graphene.Enum):
    LAST_MODIFIED_AT = ["updated_at", "name", "pk"]

    @property
    def description(self):
        # pylint: disable=no-member
        if self.name in InitiativeVariantSortField.__enum__._member_names_:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort initiatives variants by {sort_name}."

        raise ValueError("Unsupported enum value: %s" % self.value)


class InitiativeVariantSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = InitiativeVariantSortField
        type_name = "initiativeVariants"


class InitiativeTypeSortField(graphene.Enum):
    NAME = ["name", "slug"]
    DIGITAL = ["is_digital", "name", "slug"]
    SHIPPING_REQUIRED = ["is_shipping_required", "name", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            InitiativeTypeSortField.NAME.name: "name",
            InitiativeTypeSortField.DIGITAL.name: "type",
            InitiativeTypeSortField.SHIPPING_REQUIRED.name: "shipping",
        }
        if self.name in descriptions:
            return f"Sort initiatives by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class InitiativeTypeSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = InitiativeTypeSortField
        type_name = "initiative types"
