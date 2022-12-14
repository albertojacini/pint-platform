from django.urls import reverse
from django.utils.functional import SimpleLazyObject

# from ..graphql.notifications.schema import ExternalNotificationMutations
from .account.schema import AccountMutations, AccountQueries
from .app.schema import AppMutations, AppQueries

# from .attribute.schema import AttributeMutations, AttributeQueries
# from .channel.schema import ChannelMutations, ChannelQueries
# from .checkout.schema import CheckoutMutations, CheckoutQueries
from .core.enums import unit_enums
from .core.federation.schema import build_federated_schema
from .core.schema import CoreMutations, CoreQueries
from .csv.schema import CsvMutations, CsvQueries

# from .order.schema import OrderMutations, OrderQueries
# from .page.schema import PageMutations, PageQueries
# from .payment.schema import PaymentMutations, PaymentQueries
# from .plugins.schema import PluginsMutations, PluginsQueries
from .initiative.schema import InitiativeMutations, InitiativeQueries

# from .discount.schema import DiscountMutations, DiscountQueries
# from .giftcard.schema import GiftCardMutations, GiftCardQueries
# from .invoice.schema import InvoiceMutations
# from .menu.schema import MenuMutations, MenuQueries
from .meta.schema import MetaMutations

# from .shipping.schema import ShippingMutations, ShippingQueries
# from .shop.schema import ShopMutations, ShopQueries
from .translations.schema import TranslationQueries

# from .warehouse.schema import StockQueries, WarehouseMutations, WarehouseQueries
from .webhook.schema import WebhookMutations, WebhookQueries
from .webhook.subscription_types import WEBHOOK_TYPES_MAP, Subscription

API_PATH = SimpleLazyObject(lambda: reverse("api"))


class Query(
    AccountQueries,
    AppQueries,
    # AttributeQueries,
    # ChannelQueries,
    # CheckoutQueries,
    CoreQueries,
    CsvQueries,
    # DiscountQueries,
    # PluginsQueries,
    # GiftCardQueries,
    # MenuQueries,
    # OrderQueries,
    # PageQueries,
    # PaymentQueries,
    InitiativeQueries,
    # ShippingQueries,
    # ShopQueries,
    # StockQueries,
    TranslationQueries,
    # WarehouseQueries,
    WebhookQueries,
):
    pass


class Mutation(
    AccountMutations,
    AppMutations,
    # AttributeMutations,
    # ChannelMutations,
    # CheckoutMutations,
    CoreMutations,
    CsvMutations,
    # DiscountMutations,
    # ExternalNotificationMutations,
    # PluginsMutations,
    # GiftCardMutations,
    # InvoiceMutations,
    # MenuMutations,
    MetaMutations,
    # OrderMutations,
    # PageMutations,
    # PaymentMutations,
    InitiativeMutations,
    # ShippingMutations,
    # ShopMutations,
    # WarehouseMutations,
    WebhookMutations,
):
    pass


schema = build_federated_schema(
    Query,
    mutation=Mutation,
    types=unit_enums + list(WEBHOOK_TYPES_MAP.values()),
    subscription=Subscription,
)
