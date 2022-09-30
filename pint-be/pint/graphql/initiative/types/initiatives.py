import sys
from collections import defaultdict
from dataclasses import asdict
from typing import List, Optional

import graphene
from django_countries.fields import Country
from graphene import relay

# from ....attribute import models as attribute_models
from ....core.permissions import (
    AuthorizationFilters,
    InitiativePermissions,
    OrderPermissions,
    has_one_of_permissions,
)
from ....core.tracing import traced_resolver
from ....core.utils import get_currency_for_country
from ....core.weight import convert_weight_to_default_weight_unit
from ....initiative import models
from ....initiative.models import ALL_INITIATIVES_PERMISSIONS

# from ....initiative.utils import calculate_revenue_for_variant
# from ....initiative.utils.availability import (
#     get_initiative_availability,
#     get_variant_availability,
# )
# from ....initiative.utils.variants import get_variant_selection_attributes
from ....thumbnail.utils import get_image_or_proxy_url, get_thumbnail_size

# from ....warehouse.reservations import is_reservation_enabled
from ...account import types as account_types
from ...account.enums import CountryCodeEnum

# from ...attribute.filters import AttributeFilterInput
# from ...attribute.resolvers import resolve_attributes
# from ...attribute.types import (
#     AssignedVariantAttribute,
#     Attribute,
#     AttributeCountableConnection,
#     SelectedAttribute,
# )
# from ...channel import ChannelContext, ChannelQsContext
# from ...channel.dataloaders import ChannelBySlugLoader
# from ...channel.types import ChannelContextType, ChannelContextTypeWithMetadata
# from ...channel.utils import get_default_channel_slug_or_graphql_error
from ...core.connection import (
    CountableConnection,
    create_connection_slice,
    filter_connection_queryset,
)
from ...core.descriptions import (
    ADDED_IN_31,
    DEPRECATED_IN_3X_FIELD,
    DEPRECATED_IN_3X_INPUT,
    PREVIEW_FEATURE,
    RICH_CONTENT,
)
from ...core.enums import ReportingPeriod
from ...core.federation import federated_entity, resolve_federation_references
from ...core.fields import (
    ConnectionField,
    FilterConnectionField,
    JSONString,
    PermissionsField,
)
from ...core.types import (  # TaxType,; Weight,
    Image,
    ModelObjectType,
    NonNullList,
    TaxedMoney,
    TaxedMoneyRange,
    ThumbnailField,
)
from ...core.utils import from_global_id_or_error

# from ...discount.dataloaders import DiscountsByDateTimeLoader
from ...meta.types import ObjectWithMetadata

# from ...order.dataloaders import (
#     OrderByIdLoader,
#     OrderLinesByVariantIdAndChannelIdLoader,
# )
# from ...initiative.dataloaders.initiatives import (
#     AvailableInitiativeVariantsByInitiativeIdAndChannel,
#     InitiativeVariantsByInitiativeIdAndChannel,
# )
from ...translations.fields import TranslationField
from ...translations.types import (  # CategoryTranslation,; CollectionTranslation,; InitiativeVariantTranslation,
    InitiativeTranslation,
)
from ...utils import get_user_or_app_from_context
from ...utils.filters import reporting_period_to_date

# from ...warehouse.dataloaders import (
#     AvailableQuantityByInitiativeVariantIdCountryCodeAndChannelSlugLoader,
#     PreorderQuantityReservedByVariantChannelListingIdLoader,
#     StocksWithAvailableQuantityByInitiativeVariantIdCountryCodeAndChannelLoader,
# )
# from ...warehouse.types import Stock
from ..dataloaders import (  # CategoryByIdLoader,; CategoryChildrenByCategoryIdLoader,; CollectionChannelListingByCollectionIdAndChannelSlugLoader,; CollectionChannelListingByCollectionIdLoader,; CollectionsByInitiativeIdLoader,; ImagesByInitiativeVariantIdLoader,; MediaByInitiativeVariantIdLoader,; InitiativeAttributesByInitiativeTypeIdLoader,; InitiativeChannelListingByInitiativeIdAndChannelSlugLoader,; InitiativeChannelListingByInitiativeIdLoader,; InitiativeTypeByIdLoader,; InitiativeVariantByIdLoader,; InitiativeVariantsByInitiativeIdLoader,; SelectedAttributesByInitiativeIdLoader,; SelectedAttributesByInitiativeVariantIdLoader,; ThumbnailByCategoryIdSizeAndFormatLoader,; ThumbnailByCollectionIdSizeAndFormatLoader,; VariantAttributesByInitiativeTypeIdLoader,; VariantChannelListingByVariantIdAndChannelSlugLoader,; VariantChannelListingByVariantIdLoader,; VariantsChannelListingByInitiativeIdAndChannelSlugLoader,
    ImagesByInitiativeIdLoader,
    InitiativeByIdLoader,
    MediaByInitiativeIdLoader,
    ThumbnailByInitiativeMediaIdSizeAndFormatLoader,
)
from ..enums import InitiativeMediaType

# from ..enums import InitiativeMediaType, InitiativeTypeKindEnum, VariantAttributeScope
from ..filters import InitiativeFilterInput

# from ..resolvers import resolve_initiative_variants, resolve_initiatives
from ..sorters import InitiativeOrder

# from .channels import (
#     CollectionChannelListing,
#     InitiativeChannelListing,
#     InitiativeVariantChannelListing,
# )
# from .digital_contents import DigitalContent

# destination_address_argument = graphene.Argument(
#     account_types.AddressInput,
#     description=(
#         "Destination address used to find warehouses where stock availability "
#         "for this initiative is checked. If address is empty, uses "
#         "`Shop.companyAddress` or fallbacks to server's "
#         "`settings.DEFAULT_COUNTRY` configuration."
#     ),
# )


class Margin(graphene.ObjectType):
    start = graphene.Int()
    stop = graphene.Int()


class BasePricingInfo(graphene.ObjectType):
    on_sale = graphene.Boolean(description="Whether it is in sale or not.")
    discount = graphene.Field(
        TaxedMoney, description="The discount amount if in sale (null otherwise)."
    )
    discount_local_currency = graphene.Field(
        TaxedMoney, description="The discount amount in the local currency."
    )


class VariantPricingInfo(BasePricingInfo):
    discount_local_currency = graphene.Field(
        TaxedMoney, description="The discount amount in the local currency."
    )
    price = graphene.Field(
        TaxedMoney, description="The price, with any discount subtracted."
    )
    price_undiscounted = graphene.Field(
        TaxedMoney, description="The price without any discount."
    )
    price_local_currency = graphene.Field(
        TaxedMoney, description="The discounted price in the local currency."
    )

    class Meta:
        description = "Represents availability of a variant in the storefront."


# class InitiativePricingInfo(BasePricingInfo):
#     price_range = graphene.Field(
#         TaxedMoneyRange,
#         description="The discounted price range of the initiative variants.",
#     )
#     price_range_undiscounted = graphene.Field(
#         TaxedMoneyRange,
#         description="The undiscounted price range of the initiative variants.",
#     )
#     price_range_local_currency = graphene.Field(
#         TaxedMoneyRange,
#         description=(
#             "The discounted price range of the initiative variants "
#             "in the local currency."
#         ),
#     )
#
#     class Meta:
#         description = "Represents availability of a initiative in the storefront."
#
#
# class PreorderData(graphene.ObjectType):
#     global_threshold = PermissionsField(
#         graphene.Int,
#         required=False,
#         description="The global preorder threshold for initiative variant.",
#         permissions=[InitiativePermissions.MANAGE_INITIATIVES],
#     )
#     global_sold_units = PermissionsField(
#         graphene.Int,
#         required=True,
#         description="Total number of sold initiative variant during preorder.",
#         permissions=[InitiativePermissions.MANAGE_INITIATIVES],
#     )
#     end_date = graphene.DateTime(required=False, description="Preorder end date.")
#
#     class Meta:
#         description = "Represents preorder settings for initiative variant."
#
#     @staticmethod
#     def resolve_global_threshold(root, _info):
#         return root.global_threshold
#
#     @staticmethod
#     def resolve_global_sold_units(root, _info):
#         return root.global_sold_units
#
#
# @federated_entity("id channel")
# class InitiativeVariant(ChannelContextTypeWithMetadata, ModelObjectType):
#     id = graphene.GlobalID(required=True)
#     name = graphene.String(required=True)
#     sku = graphene.String()
#     initiative = graphene.Field(lambda: Initiative, required=True)
#     track_inventory = graphene.Boolean(required=True)
#     quantity_limit_per_customer = graphene.Int()
#     weight = graphene.Field(Weight)
#     channel = graphene.String(
#         description=(
#             "Channel given to retrieve this initiative variant. Also used by federation "
#             "gateway to resolve this object in a federated query."
#         ),
#     )
#     channel_listings = PermissionsField(
#         NonNullList(InitiativeVariantChannelListing),
#         description="List of price information in channels for the initiative.",
#         permissions=[
#             AuthorizationFilters.AUTHENTICATED_APP,
#             AuthorizationFilters.AUTHENTICATED_STAFF_USER,
#         ],
#     )
#     pricing = graphene.Field(
#         VariantPricingInfo,
#         address=destination_address_argument,
#         description=(
#             "Lists the storefront variant's pricing, the current price and discounts, "
#             "only meant for displaying."
#         ),
#     )
#     attributes = NonNullList(
#         SelectedAttribute,
#         required=True,
#         description="List of attributes assigned to this variant.",
#         variant_selection=graphene.Argument(
#             VariantAttributeScope,
#             description="Define scope of returned attributes.",
#         ),
#     )
#     margin = graphene.Int(description="Gross margin percentage value.")
#     quantity_ordered = PermissionsField(
#         graphene.Int,
#         description="Total quantity ordered.",
#         permissions=[InitiativePermissions.MANAGE_INITIATIVES],
#     )
#     revenue = PermissionsField(
#         TaxedMoney,
#         period=graphene.Argument(ReportingPeriod),
#         description=(
#             "Total revenue generated by a variant in given period of time. Note: this "
#             "field should be queried using `reportInitiativeSales` query as it uses "
#             "optimizations suitable for such calculations."
#         ),
#         permissions=[InitiativePermissions.MANAGE_INITIATIVES],
#     )
#     images = NonNullList(
#         lambda: InitiativeImage,
#         description="List of images for the initiative variant.",
#         deprecation_reason=f"{DEPRECATED_IN_3X_FIELD} Use the `media` field instead.",
#     )
#     media = NonNullList(
#         lambda: InitiativeMedia,
#         description="List of media for the initiative variant.",
#     )
#     translation = TranslationField(
#         InitiativeVariantTranslation,
#         type_name="initiative variant",
#         resolver=ChannelContextType.resolve_translation,
#     )
#     digital_content = PermissionsField(
#         DigitalContent,
#         description="Digital content for the initiative variant.",
#         permissions=[InitiativePermissions.MANAGE_INITIATIVES],
#     )
#     stocks = PermissionsField(
#         NonNullList(Stock),
#         description="Stocks for the initiative variant.",
#         address=destination_address_argument,
#         country_code=graphene.Argument(
#             CountryCodeEnum,
#             description=(
#                 "Two-letter ISO 3166-1 country code. "
#                 f"{DEPRECATED_IN_3X_INPUT} Use `address` argument instead."
#             ),
#         ),
#         permissions=[
#             InitiativePermissions.MANAGE_INITIATIVES,
#             OrderPermissions.MANAGE_ORDERS,
#         ],
#     )
#     quantity_available = graphene.Int(
#         required=False,
#         description=(
#             "Quantity of a initiative available for sale in one checkout. "
#             "Field value will be `null` when "
#             "no `limitQuantityPerCheckout` in global settings has been set, and "
#             "`initiativeVariant` stocks are not tracked."
#         ),
#         address=destination_address_argument,
#         country_code=graphene.Argument(
#             CountryCodeEnum,
#             description=(
#                 "Two-letter ISO 3166-1 country code. When provided, the exact quantity "
#                 "from a warehouse operating in shipping zones that contain this "
#                 "country will be returned. Otherwise, it will return the maximum "
#                 "quantity from all shipping zones. "
#                 f"{DEPRECATED_IN_3X_INPUT} Use `address` argument instead."
#             ),
#         ),
#     )
#     preorder = graphene.Field(
#         PreorderData,
#         required=False,
#         description=(
#             "Preorder data for initiative variant." + ADDED_IN_31 + PREVIEW_FEATURE
#         ),
#     )
#     created = graphene.DateTime(required=True)
#     updated_at = graphene.DateTime(required=True)
#
#     class Meta:
#         default_resolver = ChannelContextType.resolver_with_context
#         description = (
#             "Represents a version of a initiative such as different size or color."
#         )
#         interfaces = [relay.Node, ObjectWithMetadata]
#         model = models.InitiativeVariant
#
#     @staticmethod
#     def resolve_created(root: ChannelContext[models.InitiativeVariant], _info):
#         return root.node.created_at
#
#     @staticmethod
#     def resolve_channel(root: ChannelContext[models.Initiative], _info):
#         return root.channel_slug
#
#     @staticmethod
#     def resolve_stocks(
#         root: ChannelContext[models.InitiativeVariant],
#         info,
#         address=None,
#         country_code=None,
#     ):
#         if address is not None:
#             country_code = address.country
#         return StocksWithAvailableQuantityByInitiativeVariantIdCountryCodeAndChannelLoader(
#             info.context
#         ).load((root.node.id, country_code, root.channel_slug))
#
#     @staticmethod
#     def resolve_quantity_available(
#         root: ChannelContext[models.InitiativeVariant],
#         info,
#         address=None,
#         country_code=None,
#     ):
#         if address is not None:
#             country_code = address.country
#
#         channel_slug = str(root.channel_slug) if root.channel_slug else None
#
#         global_quantity_limit_per_checkout = (
#             info.context.site.settings.limit_quantity_per_checkout
#         )
#
#         if root.node.is_preorder_active():
#             variant = root.node
#             channel_listing = VariantChannelListingByVariantIdAndChannelSlugLoader(
#                 info.context
#             ).load((variant.id, channel_slug))
#
#             def calculate_available_per_channel(channel_listing):
#                 if (
#                     channel_listing
#                     and channel_listing.preorder_quantity_threshold is not None
#                 ):
#                     if is_reservation_enabled(info.context.site.settings):
#                         quantity_reserved = (
#                             PreorderQuantityReservedByVariantChannelListingIdLoader(
#                                 info.context
#                             ).load(channel_listing.id)
#                         )
#
#                         def calculate_available_channel_quantity_with_reservations(
#                             reserved_quantity,
#                         ):
#                             return max(
#                                 min(
#                                     channel_listing.preorder_quantity_threshold
#                                     - channel_listing.preorder_quantity_allocated
#                                     - reserved_quantity,
#                                     global_quantity_limit_per_checkout or sys.maxsize,
#                                 ),
#                                 0,
#                             )
#
#                         return quantity_reserved.then(
#                             calculate_available_channel_quantity_with_reservations
#                         )
#
#                     return min(
#                         channel_listing.preorder_quantity_threshold
#                         - channel_listing.preorder_quantity_allocated,
#                         global_quantity_limit_per_checkout or sys.maxsize,
#                     )
#                 if variant.preorder_global_threshold is not None:
#                     variant_channel_listings = VariantChannelListingByVariantIdLoader(
#                         info.context
#                     ).load(variant.id)
#
#                     def calculate_available_global(variant_channel_listings):
#                         if not variant_channel_listings:
#                             return global_quantity_limit_per_checkout
#                         global_sold_units = sum(
#                             channel_listing.preorder_quantity_allocated
#                             for channel_listing in variant_channel_listings
#                         )
#
#                         available_quantity = variant.preorder_global_threshold
#                         available_quantity -= global_sold_units
#
#                         if is_reservation_enabled(info.context.site.settings):
#                             quantity_reserved = (
#                                 PreorderQuantityReservedByVariantChannelListingIdLoader(
#                                     info.context
#                                 ).load_many(
#                                     [listing.id for listing in variant_channel_listings]
#                                 )
#                             )
#
#                             def calculate_available_global_quantity_with_reservations(
#                                 reserved_quantities,
#                             ):
#                                 return max(
#                                     min(
#                                         variant.preorder_global_threshold
#                                         - global_sold_units
#                                         - sum(reserved_quantities),
#                                         global_quantity_limit_per_checkout
#                                         or sys.maxsize,
#                                     ),
#                                     0,
#                                 )
#
#                             return quantity_reserved.then(
#                                 calculate_available_global_quantity_with_reservations
#                             )
#
#                         return min(
#                             variant.preorder_global_threshold - global_sold_units,
#                             global_quantity_limit_per_checkout or sys.maxsize,
#                         )
#
#                     return variant_channel_listings.then(calculate_available_global)
#
#                 return global_quantity_limit_per_checkout
#
#             return channel_listing.then(calculate_available_per_channel)
#
#         if not root.node.track_inventory:
#             return global_quantity_limit_per_checkout
#
#         return AvailableQuantityByInitiativeVariantIdCountryCodeAndChannelSlugLoader(
#             info.context
#         ).load((root.node.id, country_code, channel_slug))
#
#     @staticmethod
#     def resolve_digital_content(root: ChannelContext[models.InitiativeVariant], _info):
#         return getattr(root.node, "digital_content", None)
#
#     @staticmethod
#     def resolve_attributes(
#         root: ChannelContext[models.InitiativeVariant],
#         info,
#         variant_selection: Optional[str] = None,
#     ):
#         def apply_variant_selection_filter(selected_attributes):
#             if not variant_selection or variant_selection == VariantAttributeScope.ALL:
#                 return selected_attributes
#             attributes = [
#                 (selected_att["attribute"], selected_att["variant_selection"])
#                 for selected_att in selected_attributes
#             ]
#             variant_selection_attrs = [
#                 attr for attr, _ in get_variant_selection_attributes(attributes)
#             ]
#
#             if variant_selection == VariantAttributeScope.VARIANT_SELECTION:
#                 return [
#                     selected_attribute
#                     for selected_attribute in selected_attributes
#                     if selected_attribute["attribute"] in variant_selection_attrs
#                 ]
#             return [
#                 selected_attribute
#                 for selected_attribute in selected_attributes
#                 if selected_attribute["attribute"] not in variant_selection_attrs
#             ]
#
#         return (
#             SelectedAttributesByInitiativeVariantIdLoader(info.context)
#             .load(root.node.id)
#             .then(apply_variant_selection_filter)
#         )
#
#     @staticmethod
#     def resolve_channel_listings(root: ChannelContext[models.InitiativeVariant], info):
#         return VariantChannelListingByVariantIdLoader(info.context).load(root.node.id)
#
#     @staticmethod
#     def resolve_pricing(
#         root: ChannelContext[models.InitiativeVariant], info, *, address=None
#     ):
#         if not root.channel_slug:
#             return None
#
#         channel_slug = str(root.channel_slug)
#         context = info.context
#
#         initiative = InitiativeByIdLoader(context).load(root.node.initiative_id)
#         initiative_channel_listing = InitiativeChannelListingByInitiativeIdAndChannelSlugLoader(
#             context
#         ).load((root.node.initiative_id, channel_slug))
#         variant_channel_listing = VariantChannelListingByVariantIdAndChannelSlugLoader(
#             context
#         ).load((root.node.id, channel_slug))
#         collections = CollectionsByInitiativeIdLoader(context).load(root.node.initiative_id)
#         channel = ChannelBySlugLoader(context).load(channel_slug)
#
#         address_country = address.country if address is not None else None
#
#         def calculate_pricing_info(discounts):
#             def calculate_pricing_with_channel(channel):
#                 def calculate_pricing_with_initiative_variant_channel_listings(
#                     variant_channel_listing,
#                 ):
#                     def calculate_pricing_with_initiative(initiative):
#                         def calculate_pricing_with_initiative_channel_listings(
#                             initiative_channel_listing,
#                         ):
#                             def calculate_pricing_with_collections(collections):
#                                 if (
#                                     not variant_channel_listing
#                                     or not initiative_channel_listing
#                                 ):
#                                     return None
#
#                                 country_code = (
#                                     address_country or channel.default_country.code
#                                 )
#
#                                 local_currency = None
#                                 local_currency = get_currency_for_country(country_code)
#
#                                 availability = get_variant_availability(
#                                     variant=root.node,
#                                     variant_channel_listing=variant_channel_listing,
#                                     initiative=initiative,
#                                     initiative_channel_listing=initiative_channel_listing,
#                                     collections=collections,
#                                     discounts=discounts,
#                                     channel=channel,
#                                     country=Country(country_code),
#                                     local_currency=local_currency,
#                                     plugins=context.plugins,
#                                 )
#                                 return VariantPricingInfo(**asdict(availability))
#
#                             return collections.then(calculate_pricing_with_collections)
#
#                         return initiative_channel_listing.then(
#                             calculate_pricing_with_initiative_channel_listings
#                         )
#
#                     return initiative.then(calculate_pricing_with_initiative)
#
#                 return variant_channel_listing.then(
#                     calculate_pricing_with_initiative_variant_channel_listings
#                 )
#
#             return channel.then(calculate_pricing_with_channel)
#
#         return (
#             DiscountsByDateTimeLoader(context)
#             .load(info.context.request_time)
#             .then(calculate_pricing_info)
#         )
#
#     @staticmethod
#     def resolve_initiative(root: ChannelContext[models.InitiativeVariant], info):
#         initiative = InitiativeByIdLoader(info.context).load(root.node.initiative_id)
#         return initiative.then(
#             lambda initiative: ChannelContext(node=initiative, channel_slug=root.channel_slug)
#         )
#
#     @staticmethod
#     def resolve_quantity_ordered(root: ChannelContext[models.InitiativeVariant], _info):
#         # This field is added through annotation when using the
#         # `resolve_report_initiative_sales` resolver.
#         return getattr(root.node, "quantity_ordered", None)
#
#     @staticmethod
#     @traced_resolver
#     def resolve_revenue(root: ChannelContext[models.InitiativeVariant], info, *, period):
#         start_date = reporting_period_to_date(period)
#         variant = root.node
#         channel_slug = root.channel_slug
#
#         def calculate_revenue_with_channel(channel):
#             if not channel:
#                 return None
#
#             def calculate_revenue_with_order_lines(order_lines):
#                 def calculate_revenue_with_orders(orders):
#                     orders_dict = {order.id: order for order in orders}
#                     return calculate_revenue_for_variant(
#                         variant,
#                         start_date,
#                         order_lines,
#                         orders_dict,
#                         channel.currency_code,
#                     )
#
#                 order_ids = [order_line.order_id for order_line in order_lines]
#                 return (
#                     OrderByIdLoader(info.context)
#                     .load_many(order_ids)
#                     .then(calculate_revenue_with_orders)
#                 )
#
#             return (
#                 OrderLinesByVariantIdAndChannelIdLoader(info.context)
#                 .load((variant.id, channel.id))
#                 .then(calculate_revenue_with_order_lines)
#             )
#
#         return (
#             ChannelBySlugLoader(info.context)
#             .load(channel_slug)
#             .then(calculate_revenue_with_channel)
#         )
#
#     @staticmethod
#     def resolve_media(root: ChannelContext[models.InitiativeVariant], info):
#         return MediaByInitiativeVariantIdLoader(info.context).load(root.node.id)
#
#     @staticmethod
#     def resolve_images(root: ChannelContext[models.InitiativeVariant], info):
#         return ImagesByInitiativeVariantIdLoader(info.context).load(root.node.id)
#
#     @staticmethod
#     def resolve_weight(root: ChannelContext[models.InitiativeVariant], _info):
#         return convert_weight_to_default_weight_unit(root.node.weight)
#
#     @staticmethod
#     @traced_resolver
#     def resolve_preorder(root: ChannelContext[models.InitiativeVariant], info):
#         variant = root.node
#
#         variant_channel_listings = VariantChannelListingByVariantIdLoader(
#             info.context
#         ).load(variant.id)
#
#         def calculate_global_sold_units(variant_channel_listings):
#             global_sold_units = sum(
#                 channel_listing.preorder_quantity_allocated
#                 for channel_listing in variant_channel_listings
#             )
#             return (
#                 PreorderData(
#                     global_threshold=variant.preorder_global_threshold,
#                     global_sold_units=global_sold_units,
#                     end_date=variant.preorder_end_date,
#                 )
#                 if variant.is_preorder_active()
#                 else None
#             )
#
#         return variant_channel_listings.then(calculate_global_sold_units)
#
#     @staticmethod
#     def __resolve_references(roots: List["InitiativeVariant"], info):
#         requestor = get_user_or_app_from_context(info.context)
#         requestor_has_access_to_all = has_one_of_permissions(
#             requestor, ALL_INITIATIVES_PERMISSIONS
#         )
#
#         channels = defaultdict(set)
#         roots_ids = []
#         for root in roots:
#             roots_ids.append(f"{root.channel}_{root.id}")
#             channels[root.channel].add(root.id)
#
#         variants = {}
#         for channel, ids in channels.items():
#             qs = resolve_initiative_variants(
#                 info,
#                 requestor_has_access_to_all,
#                 requestor,
#                 ids=ids,
#                 channel_slug=channel,
#             ).qs
#             for variant in qs:
#                 global_id = graphene.Node.to_global_id("InitiativeVariant", variant.id)
#                 variants[f"{channel}_{global_id}"] = ChannelContext(
#                     channel_slug=channel, node=variant
#                 )
#
#         return [variants.get(root_id) for root_id in roots_ids]
#
#
# class InitiativeVariantCountableConnection(CountableConnection):
#     class Meta:
#         node = InitiativeVariant


# @federated_entity("id channel")
# class Initiative(ChannelContextTypeWithMetadata, ModelObjectType):
class Initiative(ModelObjectType):
    id = graphene.GlobalID(required=True)
    seo_title = graphene.String()
    seo_description = graphene.String()
    title = graphene.String(required=True)
    description = JSONString(
        description="Description of the initiative." + RICH_CONTENT
    )
    # initiative_type = graphene.Field(lambda: InitiativeType, required=True)
    slug = graphene.String(required=True)
    # category = graphene.Field(lambda: Category)
    created = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
    # charge_taxes = graphene.Boolean(required=True)
    # weight = graphene.Field(Weight)
    # default_variant = graphene.Field(InitiativeVariant)
    # rating = graphene.Float()
    # channel = graphene.String(
    #     description=(
    #         "Channel given to retrieve this initiative. Also used by federation "
    #         "gateway to resolve this object in a federated query."
    #     ),
    # )
    # description_json = JSONString(
    #     description="Description of the initiative." + RICH_CONTENT,
    #     deprecation_reason=(
    #         f"{DEPRECATED_IN_3X_FIELD} Use the `description` field instead."
    #     ),
    # )
    # thumbnail = ThumbnailField()
    # pricing = graphene.Field(
    #     InitiativePricingInfo,
    #     address=destination_address_argument,
    #     description=(
    #         "Lists the storefront initiative's pricing, the current price and discounts, "
    #         "only meant for displaying."
    #     ),
    # )
    # is_available = graphene.Boolean(
    #     address=destination_address_argument,
    #     description="Whether the initiative is in stock and visible or not.",
    # )
    # tax_type = graphene.Field(
    #     TaxType, description="A type of tax. Assigned by enabled tax gateway"
    # )
    # attributes = NonNullList(
    #     SelectedAttribute,
    #     required=True,
    #     description="List of attributes assigned to this initiative.",
    # )
    # channel_listings = PermissionsField(
    #     NonNullList(InitiativeChannelListing),
    #     description="List of availability in channels for the initiative.",
    #     permissions=[InitiativePermissions.MANAGE_INITIATIVES],
    # )
    # media_by_id = graphene.Field(
    #     lambda: InitiativeMedia,
    #     id=graphene.Argument(graphene.ID, description="ID of a initiative media."),
    #     description="Get a single initiative media by ID.",
    # )
    # image_by_id = graphene.Field(
    #     lambda: InitiativeImage,
    #     id=graphene.Argument(graphene.ID, description="ID of a initiative image."),
    #     description="Get a single initiative image by ID.",
    #     deprecation_reason=(
    #         f"{DEPRECATED_IN_3X_FIELD} Use the `mediaById` field instead."
    #     ),
    # )
    # variants = NonNullList(
    #     InitiativeVariant,
    #     description=(
    #         "List of variants for the initiative. Requires the following permissions to "
    #         "include the unpublished items: "
    #         f"{', '.join([p.name for p in ALL_INITIATIVES_PERMISSIONS])}."
    #     ),
    # )
    # media = NonNullList(
    #     lambda: InitiativeMedia,
    #     description="List of media for the initiative.",
    # )
    # images = NonNullList(
    #     lambda: InitiativeImage,
    #     description="List of images for the initiative.",
    #     deprecation_reason=f"{DEPRECATED_IN_3X_FIELD} Use the `media` field instead.",
    # )
    # collections = NonNullList(
    #     lambda: Collection,
    #     description=(
    #         "List of collections for the initiative. Requires the following permissions "
    #         "to include the unpublished items: "
    #         f"{', '.join([p.name for p in ALL_INITIATIVES_PERMISSIONS])}."
    #     ),
    # )
    # translation = TranslationField(
    #     InitiativeTranslation,
    #     type_name="initiative",
    #     resolver=ChannelContextType.resolve_translation,
    # )
    # available_for_purchase = graphene.Date(
    #     description="Date when initiative is available for purchase.",
    #     deprecation_reason=(
    #         f"{DEPRECATED_IN_3X_FIELD} "
    #         "Use the `availableForPurchaseAt` field to fetch "
    #         "the available for purchase date."
    #     ),
    # )
    # available_for_purchase_at = graphene.DateTime(
    #     description="Date when initiative is available for purchase."
    # )
    # is_available_for_purchase = graphene.Boolean(
    #     description="Whether the initiative is available for purchase."
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
    # def resolve_channel(root: ChannelContext[models.Initiative], _info):
    #     return root.channel_slug
    #
    # @staticmethod
    # def resolve_default_variant(root: ChannelContext[models.Initiative], info):
    #     default_variant_id = root.node.default_variant_id
    #     if default_variant_id is None:
    #         return None
    #
    #     def return_default_variant_with_channel_context(variant):
    #         return ChannelContext(node=variant, channel_slug=root.channel_slug)
    #
    #     return (
    #         InitiativeVariantByIdLoader(info.context)
    #         .load(default_variant_id)
    #         .then(return_default_variant_with_channel_context)
    #     )
    #
    # @staticmethod
    # def resolve_category(root: ChannelContext[models.Initiative], info):
    #     category_id = root.node.category_id
    #     if category_id is None:
    #         return None
    #     return CategoryByIdLoader(info.context).load(category_id)
    #
    # @staticmethod
    # def resolve_description_json(root: ChannelContext[models.Initiative], _info):
    #     description = root.node.description
    #     return description if description is not None else {}
    #
    # @staticmethod
    # def resolve_tax_type(root: ChannelContext[models.Initiative], info):
    #     tax_data = info.context.plugins.get_tax_code_from_object_meta(root.node)
    #     return TaxType(tax_code=tax_data.code, description=tax_data.description)
    #
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
    #
    # @staticmethod
    # def resolve_url(_root, _info):
    #     return ""
    #
    # @staticmethod
    # def resolve_pricing(root: ChannelContext[models.Initiative], info, *, address=None):
    #     if not root.channel_slug:
    #         return None
    #
    #     channel_slug = str(root.channel_slug)
    #     context = info.context
    #
    #     initiative_channel_listing = InitiativeChannelListingByInitiativeIdAndChannelSlugLoader(
    #         context
    #     ).load((root.node.id, channel_slug))
    #     variants = InitiativeVariantsByInitiativeIdLoader(context).load(root.node.id)
    #     variants_channel_listing = (
    #         VariantsChannelListingByInitiativeIdAndChannelSlugLoader(context).load(
    #             (root.node.id, channel_slug)
    #         )
    #     )
    #     collections = CollectionsByInitiativeIdLoader(context).load(root.node.id)
    #     channel = ChannelBySlugLoader(context).load(channel_slug)
    #
    #     address_country = address.country if address is not None else None
    #
    #     def calculate_pricing_info(discounts):
    #         def calculate_pricing_with_channel(channel):
    #             def calculate_pricing_with_initiative_channel_listings(
    #                 initiative_channel_listing,
    #             ):
    #                 def calculate_pricing_with_variants(variants):
    #                     def calculate_pricing_with_variants_channel_listings(
    #                         variants_channel_listing,
    #                     ):
    #                         def calculate_pricing_with_collections(collections):
    #                             if not variants_channel_listing:
    #                                 return None
    #
    #                             local_currency = None
    #                             country_code = (
    #                                 address_country or channel.default_country.code
    #                             )
    #                             local_currency = get_currency_for_country(country_code)
    #
    #                             availability = get_initiative_availability(
    #                                 initiative=root.node,
    #                                 initiative_channel_listing=initiative_channel_listing,
    #                                 variants=variants,
    #                                 variants_channel_listing=variants_channel_listing,
    #                                 collections=collections,
    #                                 discounts=discounts,
    #                                 channel=channel,
    #                                 manager=context.plugins,
    #                                 country=Country(country_code),
    #                                 local_currency=local_currency,
    #                             )
    #                             return InitiativePricingInfo(**asdict(availability))
    #
    #                         return collections.then(calculate_pricing_with_collections)
    #
    #                     return variants_channel_listing.then(
    #                         calculate_pricing_with_variants_channel_listings
    #                     )
    #
    #                 return variants.then(calculate_pricing_with_variants)
    #
    #             return initiative_channel_listing.then(
    #                 calculate_pricing_with_initiative_channel_listings
    #             )
    #
    #         return channel.then(calculate_pricing_with_channel)
    #
    #     return (
    #         DiscountsByDateTimeLoader(context)
    #         .load(info.context.request_time)
    #         .then(calculate_pricing_info)
    #     )
    #
    # @staticmethod
    # @traced_resolver
    # def resolve_is_available(
    #     root: ChannelContext[models.Initiative], info, *, address=None
    # ):
    #     if not root.channel_slug:
    #         return None
    #
    #     channel_slug = str(root.channel_slug)
    #     country_code = address.country if address is not None else None
    #
    #     requestor = get_user_or_app_from_context(info.context)
    #
    #     has_required_permissions = has_one_of_permissions(
    #         requestor, ALL_INITIATIVES_PERMISSIONS
    #     )
    #
    #     def calculate_is_available(quantities):
    #         for qty in quantities:
    #             if qty > 0:
    #                 return True
    #         return False
    #
    #     def load_variants_availability(variants):
    #         keys = [(variant.id, country_code, channel_slug) for variant in variants]
    #         return AvailableQuantityByInitiativeVariantIdCountryCodeAndChannelSlugLoader(
    #             info.context
    #         ).load_many(keys)
    #
    #     def check_variant_availability():
    #         if has_required_permissions and not channel_slug:
    #             variants = InitiativeVariantsByInitiativeIdLoader(info.context).load(
    #                 root.node.id
    #             )
    #         elif has_required_permissions and channel_slug:
    #             variants = InitiativeVariantsByInitiativeIdAndChannel(info.context).load(
    #                 (root.node.id, channel_slug)
    #             )
    #         else:
    #             variants = AvailableInitiativeVariantsByInitiativeIdAndChannel(
    #                 info.context
    #             ).load((root.node.id, channel_slug))
    #         return variants.then(load_variants_availability).then(
    #             calculate_is_available
    #         )
    #
    #     def check_is_available_for_purchase(initiative_channel_listing):
    #         if initiative_channel_listing:
    #             if initiative_channel_listing.is_available_for_purchase():
    #                 return check_variant_availability()
    #         return False
    #
    #     return (
    #         InitiativeChannelListingByInitiativeIdAndChannelSlugLoader(info.context)
    #         .load((root.node.id, channel_slug))
    #         .then(check_is_available_for_purchase)
    #     )
    #
    # @staticmethod
    # def resolve_attributes(root: ChannelContext[models.Initiative], info):
    #     return SelectedAttributesByInitiativeIdLoader(info.context).load(root.node.id)
    #
    # @staticmethod
    # def resolve_media_by_id(root: ChannelContext[models.Initiative], _info, *, id):
    #     _type, pk = from_global_id_or_error(id, InitiativeMedia)
    #     return root.node.media.filter(pk=pk).first()
    #
    # @staticmethod
    # def resolve_image_by_id(root: ChannelContext[models.Initiative], _info, *, id):
    #     _type, pk = from_global_id_or_error(id, InitiativeImage)
    #     return root.node.media.filter(pk=pk).first()
    #
    # @staticmethod
    # def resolve_media(root: ChannelContext[models.Initiative], info):
    #     return MediaByInitiativeIdLoader(info.context).load(root.node.id)
    #
    # @staticmethod
    # def resolve_images(root: ChannelContext[models.Initiative], info):
    #     return ImagesByInitiativeIdLoader(info.context).load(root.node.id)
    #
    # @staticmethod
    # def resolve_variants(root: ChannelContext[models.Initiative], info):
    #     requestor = get_user_or_app_from_context(info.context)
    #     has_required_permissions = has_one_of_permissions(
    #         requestor, ALL_INITIATIVES_PERMISSIONS
    #     )
    #     if has_required_permissions and not root.channel_slug:
    #         variants = InitiativeVariantsByInitiativeIdLoader(info.context).load(root.node.id)
    #     elif has_required_permissions and root.channel_slug:
    #         variants = InitiativeVariantsByInitiativeIdAndChannel(info.context).load(
    #             (root.node.id, root.channel_slug)
    #         )
    #     else:
    #         variants = AvailableInitiativeVariantsByInitiativeIdAndChannel(info.context).load(
    #             (root.node.id, root.channel_slug)
    #         )
    #
    #     def map_channel_context(variants):
    #         return [
    #             ChannelContext(node=variant, channel_slug=root.channel_slug)
    #             for variant in variants
    #         ]
    #
    #     return variants.then(map_channel_context)
    #
    # @staticmethod
    # def resolve_channel_listings(root: ChannelContext[models.Initiative], info):
    #     return InitiativeChannelListingByInitiativeIdLoader(info.context).load(root.node.id)
    #
    # @staticmethod
    # @traced_resolver
    # def resolve_collections(root: ChannelContext[models.Initiative], info):
    #     requestor = get_user_or_app_from_context(info.context)
    #
    #     has_required_permissions = has_one_of_permissions(
    #         requestor, ALL_INITIATIVES_PERMISSIONS
    #     )
    #
    #     def return_collections(collections):
    #         if has_required_permissions:
    #             return [
    #                 ChannelContext(node=collection, channel_slug=root.channel_slug)
    #                 for collection in collections
    #             ]
    #
    #         dataloader_keys = [
    #             (collection.id, str(root.channel_slug)) for collection in collections
    #         ]
    #         CollectionChannelListingLoader = (
    #             CollectionChannelListingByCollectionIdAndChannelSlugLoader
    #         )
    #         channel_listings = CollectionChannelListingLoader(info.context).load_many(
    #             dataloader_keys
    #         )
    #
    #         def return_visible_collections(channel_listings):
    #             visible_collections = []
    #             channel_listings_dict = {
    #                 channel_listing.collection_id: channel_listing
    #                 for channel_listing in channel_listings
    #                 if channel_listing
    #             }
    #
    #             for collection in collections:
    #                 channel_listing = channel_listings_dict.get(collection.id)
    #                 if channel_listing and channel_listing.is_visible:
    #                     visible_collections.append(collection)
    #
    #             return [
    #                 ChannelContext(node=collection, channel_slug=root.channel_slug)
    #                 for collection in visible_collections
    #             ]
    #
    #         return channel_listings.then(return_visible_collections)
    #
    #     return (
    #         CollectionsByInitiativeIdLoader(info.context)
    #         .load(root.node.id)
    #         .then(return_collections)
    #     )
    #
    # @staticmethod
    # def resolve_weight(root: ChannelContext[models.Initiative], _info):
    #     return convert_weight_to_default_weight_unit(root.node.weight)
    #
    # @staticmethod
    # @traced_resolver
    # def resolve_is_available_for_purchase(root: ChannelContext[models.Initiative], info):
    #     if not root.channel_slug:
    #         return None
    #     channel_slug = str(root.channel_slug)
    #
    #     def calculate_is_available_for_purchase(initiative_channel_listing):
    #         if not initiative_channel_listing:
    #             return None
    #         return initiative_channel_listing.is_available_for_purchase()
    #
    #     return (
    #         InitiativeChannelListingByInitiativeIdAndChannelSlugLoader(info.context)
    #         .load((root.node.id, channel_slug))
    #         .then(calculate_is_available_for_purchase)
    #     )
    #
    # @staticmethod
    # @traced_resolver
    # def resolve_available_for_purchase(root: ChannelContext[models.Initiative], info):
    #     if not root.channel_slug:
    #         return None
    #     channel_slug = str(root.channel_slug)
    #
    #     def calculate_available_for_purchase(initiative_channel_listing):
    #         if not initiative_channel_listing:
    #             return None
    #         return initiative_channel_listing.available_for_purchase_at
    #
    #     return (
    #         InitiativeChannelListingByInitiativeIdAndChannelSlugLoader(info.context)
    #         .load((root.node.id, channel_slug))
    #         .then(calculate_available_for_purchase)
    #     )
    #
    # @staticmethod
    # @traced_resolver
    # def resolve_available_for_purchase_at(root: ChannelContext[models.Initiative], info):
    #     if not root.channel_slug:
    #         return None
    #     channel_slug = str(root.channel_slug)
    #
    #     def calculate_available_for_purchase(initiative_channel_listing):
    #         if not initiative_channel_listing:
    #             return None
    #         return initiative_channel_listing.available_for_purchase_at
    #
    #     return (
    #         InitiativeChannelListingByInitiativeIdAndChannelSlugLoader(info.context)
    #         .load((root.node.id, channel_slug))
    #         .then(calculate_available_for_purchase)
    #     )
    #
    # @staticmethod
    # def resolve_initiative_type(root: ChannelContext[models.Initiative], info):
    #     return InitiativeTypeByIdLoader(info.context).load(root.node.initiative_type_id)
    #
    # @staticmethod
    # def __resolve_references(roots: List["Initiative"], info):
    #     requestor = get_user_or_app_from_context(info.context)
    #     channels = defaultdict(set)
    #     roots_ids = []
    #     for root in roots:
    #         _, root_id = from_global_id_or_error(root.id, Initiative, raise_error=True)
    #         if root_id:
    #             roots_ids.append(f"{root.channel}_{root_id}")
    #             channels[root.channel].add(root_id)
    #
    #     initiatives = {}
    #     for channel, ids in channels.items():
    #         queryset = resolve_initiatives(
    #             info, requestor, channel_slug=channel
    #         ).qs.filter(id__in=ids)
    #
    #         for initiative in queryset:
    #             initiatives[f"{channel}_{initiative.id}"] = ChannelContext(
    #                 channel_slug=channel, node=initiative
    #             )
    #
    #     return [initiatives.get(root_id) for root_id in roots_ids]


class InitiativeCountableConnection(CountableConnection):
    class Meta:
        node = Initiative


# @federated_entity("id")
# class InitiativeType(ModelObjectType):
#     id = graphene.GlobalID(required=True)
#     name = graphene.String(required=True)
#     slug = graphene.String(required=True)
#     has_variants = graphene.Boolean(required=True)
#     is_shipping_required = graphene.Boolean(required=True)
#     is_digital = graphene.Boolean(required=True)
#     weight = graphene.Field(Weight)
#     kind = InitiativeTypeKindEnum(description="The initiative type kind.", required=True)
#     initiatives = ConnectionField(
#         InitiativeCountableConnection,
#         channel=graphene.String(
#             description="Slug of a channel for which the data should be returned."
#         ),
#         description="List of initiatives of this type.",
#         deprecation_reason=(
#             f"{DEPRECATED_IN_3X_FIELD} "
#             "Use the top-level `initiatives` query with the `initiativeTypes` filter."
#         ),
#     )
#     tax_type = graphene.Field(
#         TaxType, description="A type of tax. Assigned by enabled tax gateway"
#     )
#     variant_attributes = NonNullList(
#         Attribute,
#         description="Variant attributes of that initiative type.",
#         variant_selection=graphene.Argument(
#             VariantAttributeScope,
#             description="Define scope of returned attributes.",
#         ),
#         deprecation_reason=(
#             f"{DEPRECATED_IN_3X_FIELD} Use `assignedVariantAttributes` instead."
#         ),
#     )
#     assigned_variant_attributes = NonNullList(
#         AssignedVariantAttribute,
#         description=(
#             "Variant attributes of that initiative type with attached variant selection."
#             + ADDED_IN_31
#         ),
#         variant_selection=graphene.Argument(
#             VariantAttributeScope,
#             description="Define scope of returned attributes.",
#         ),
#     )
#     initiative_attributes = NonNullList(
#         Attribute, description="Initiative attributes of that initiative type."
#     )
#     available_attributes = FilterConnectionField(
#         AttributeCountableConnection,
#         filter=AttributeFilterInput(),
#         description="List of attributes which can be assigned to this initiative type.",
#         permissions=[InitiativePermissions.MANAGE_INITIATIVES],
#     )
#
#     class Meta:
#         description = (
#             "Represents a type of initiative. It defines what attributes are available to "
#             "initiatives of this type."
#         )
#         interfaces = [relay.Node, ObjectWithMetadata]
#         model = models.InitiativeType
#
#     @staticmethod
#     def resolve_tax_type(root: models.InitiativeType, info):
#         tax_data = info.context.plugins.get_tax_code_from_object_meta(root)
#         return TaxType(tax_code=tax_data.code, description=tax_data.description)
#
#     @staticmethod
#     def resolve_initiative_attributes(root: models.InitiativeType, info):
#         def unpack_attributes(attributes):
#             return [attr for attr, *_ in attributes]
#
#         return (
#             InitiativeAttributesByInitiativeTypeIdLoader(info.context)
#             .load(root.pk)
#             .then(unpack_attributes)
#         )
#
#     @staticmethod
#     @traced_resolver
#     def resolve_variant_attributes(
#         root: models.InitiativeType,
#         info,
#         variant_selection: Optional[str] = None,
#     ):
#         def apply_variant_selection_filter(attributes):
#             if not variant_selection or variant_selection == VariantAttributeScope.ALL:
#                 return [attr for attr, *_ in attributes]
#             variant_selection_attrs = get_variant_selection_attributes(attributes)
#             if variant_selection == VariantAttributeScope.VARIANT_SELECTION:
#                 return [attr for attr, *_ in variant_selection_attrs]
#             return [
#                 attr
#                 for attr, variant_selection in attributes
#                 if (attr, variant_selection) not in variant_selection_attrs
#             ]
#
#         return (
#             VariantAttributesByInitiativeTypeIdLoader(info.context)
#             .load(root.pk)
#             .then(apply_variant_selection_filter)
#         )
#
#     @staticmethod
#     @traced_resolver
#     def resolve_assigned_variant_attributes(
#         root: models.InitiativeType,
#         info,
#         variant_selection: Optional[str] = None,
#     ):
#         def apply_variant_selection_filter(attributes):
#             if not variant_selection or variant_selection == VariantAttributeScope.ALL:
#                 return [
#                     {"attribute": attr, "variant_selection": variant_selection}
#                     for attr, variant_selection in attributes
#                 ]
#             variant_selection_attrs = get_variant_selection_attributes(attributes)
#             if variant_selection == VariantAttributeScope.VARIANT_SELECTION:
#                 return [
#                     {"attribute": attr, "variant_selection": variant_selection}
#                     for attr, variant_selection in variant_selection_attrs
#                 ]
#             return [
#                 {"attribute": attr, "variant_selection": variant_selection}
#                 for attr, variant_selection in attributes
#                 if (attr, variant_selection) not in variant_selection_attrs
#             ]
#
#         return (
#             VariantAttributesByInitiativeTypeIdLoader(info.context)
#             .load(root.pk)
#             .then(apply_variant_selection_filter)
#         )
#
#     @staticmethod
#     def resolve_initiatives(root: models.InitiativeType, info, *, channel=None, **kwargs):
#         requestor = get_user_or_app_from_context(info.context)
#         if channel is None:
#             channel = get_default_channel_slug_or_graphql_error()
#         qs = root.initiatives.visible_to_user(requestor, channel)  # type: ignore
#         qs = ChannelQsContext(qs=qs, channel_slug=channel)
#         kwargs["channel"] = channel
#         return create_connection_slice(qs, info, kwargs, InitiativeCountableConnection)
#
#     @staticmethod
#     def resolve_available_attributes(root: models.InitiativeType, info, **kwargs):
#         qs = attribute_models.Attribute.objects.get_unassigned_initiative_type_attributes(
#             root.pk
#         )
#         qs = resolve_attributes(info, qs=qs)
#         qs = filter_connection_queryset(qs, kwargs, info.context)
#         return create_connection_slice(qs, info, kwargs, AttributeCountableConnection)
#
#     @staticmethod
#     def resolve_weight(root: models.InitiativeType, _info):
#         return convert_weight_to_default_weight_unit(root.weight)
#
#     @staticmethod
#     def __resolve_references(roots: List["InitiativeType"], _info):
#         return resolve_federation_references(
#             InitiativeType, roots, models.InitiativeType.objects
#         )
#
#
# class InitiativeTypeCountableConnection(CountableConnection):
#     class Meta:
#         node = InitiativeType
#
#
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
#     initiatives = FilterConnectionField(
#         InitiativeCountableConnection,
#         filter=InitiativeFilterInput(description="Filtering options for initiatives."),
#         sort_by=InitiativeOrder(description="Sort initiatives."),
#         description="List of initiatives in this collection.",
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
#             InitiativePermissions.MANAGE_INITIATIVES,
#         ],
#     )
#
#     class Meta:
#         default_resolver = ChannelContextType.resolver_with_context
#         description = "Represents a collection of initiatives."
#         interfaces = [relay.Node, ObjectWithMetadata]
#         model = models.Collection
#
#     @staticmethod
#     def resolve_channel(root: ChannelContext[models.Initiative], _info):
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
#     def resolve_initiatives(root: ChannelContext[models.Collection], info, **kwargs):
#         requestor = get_user_or_app_from_context(info.context)
#         qs = root.node.initiatives.visible_to_user(  # type: ignore
#             requestor, root.channel_slug
#         )
#         qs = ChannelQsContext(qs=qs, channel_slug=root.channel_slug)
#
#         kwargs["channel"] = root.channel_slug
#         qs = filter_connection_queryset(qs, kwargs)
#         return create_connection_slice(qs, info, kwargs, InitiativeCountableConnection)
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
#
#
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
#     initiatives = ConnectionField(
#         InitiativeCountableConnection,
#         channel=graphene.String(
#             description="Slug of a channel for which the data should be returned."
#         ),
#         description=(
#             "List of initiatives in the category. Requires the following permissions to "
#             "include the unpublished items: "
#             f"{', '.join([p.name for p in ALL_INITIATIVES_PERMISSIONS])}."
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
#             "Represents a single category of initiatives. Categories allow to organize "
#             "initiatives in a tree-hierarchies which can be used for navigation in the "
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
#     def resolve_initiatives(root: models.Category, info, *, channel=None, **kwargs):
#         requestor = get_user_or_app_from_context(info.context)
#         has_required_permissions = has_one_of_permissions(
#             requestor, ALL_INITIATIVES_PERMISSIONS
#         )
#         tree = root.get_descendants(include_self=True)
#         if channel is None and not has_required_permissions:
#             channel = get_default_channel_slug_or_graphql_error()
#         qs = models.Initiative.objects.all()
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
#         return create_connection_slice(qs, info, kwargs, InitiativeCountableConnection)
#
#     @staticmethod
#     def __resolve_references(roots: List["Category"], _info):
#         return resolve_federation_references(Category, roots, models.Category.objects)
#
#
# class CategoryCountableConnection(CountableConnection):
#     class Meta:
#         node = Category


@federated_entity("id")
class InitiativeMedia(ModelObjectType):
    id = graphene.GlobalID(required=True)
    sort_order = graphene.Int()
    alt = graphene.String(required=True)
    type = InitiativeMediaType(required=True)
    oembed_data = JSONString(required=True)
    url = ThumbnailField(graphene.String, required=True)

    class Meta:
        description = "Represents a initiative media."
        interfaces = [relay.Node]
        model = models.InitiativeMedia

    @staticmethod
    def resolve_url(root: models.InitiativeMedia, info, *, size=None, format=None):
        if root.external_url:
            return root.external_url

        if not root.image:
            return

        if not size:
            return info.context.build_absolute_uri(root.image.url)

        format = format.lower() if format else None
        size = get_thumbnail_size(size)

        def _resolve_url(thumbnail):
            url = get_image_or_proxy_url(
                thumbnail, root.id, "InitiativeMedia", size, format
            )
            return info.context.build_absolute_uri(url)

        return (
            ThumbnailByInitiativeMediaIdSizeAndFormatLoader(info.context)
            .load((root.id, size, format))
            .then(_resolve_url)
        )

    @staticmethod
    def __resolve_references(roots: List["InitiativeMedia"], _info):
        return resolve_federation_references(
            InitiativeMedia, roots, models.InitiativeMedia.objects
        )


class InitiativeImage(graphene.ObjectType):
    id = graphene.ID(required=True, description="The ID of the image.")
    alt = graphene.String(description="The alt text of the image.")
    sort_order = graphene.Int(
        required=False,
        description=(
            "The new relative sorting position of the item (from -inf to +inf). "
            "1 moves the item one position forward, -1 moves the item one position "
            "backward, 0 leaves the item unchanged."
        ),
    )
    url = ThumbnailField(graphene.String, required=True)

    class Meta:
        description = "Represents a initiative image."

    @staticmethod
    def resolve_id(root: models.InitiativeMedia, info):
        return graphene.Node.to_global_id("InitiativeImage", root.id)

    @staticmethod
    def resolve_url(root: models.InitiativeMedia, info, *, size=None, format=None):
        if not root.image:
            return

        if not size:
            return info.context.build_absolute_uri(root.image.url)

        format = format.lower() if format else None
        size = get_thumbnail_size(size)

        def _resolve_url(thumbnail):
            url = get_image_or_proxy_url(
                thumbnail, root.id, "InitiativeMedia", size, format
            )
            return info.context.build_absolute_uri(url)

        return (
            ThumbnailByInitiativeMediaIdSizeAndFormatLoader(info.context)
            .load((root.id, size, format))
            .then(_resolve_url)
        )
