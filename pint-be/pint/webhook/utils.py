from decimal import Decimal
from typing import TYPE_CHECKING, Optional

from django.db.models import Q
from django.db.models.expressions import Exists, OuterRef
from prices import TaxedMoney

from ..app.models import App
from .event_types import WebhookEventAsyncType, WebhookEventSyncType
from .models import Webhook, WebhookEvent

if TYPE_CHECKING:
    from django.db.models import QuerySet


def get_webhooks_for_event(
    event_type: str, webhooks: Optional["QuerySet[Webhook]"] = None
) -> "QuerySet[Webhook]":
    """Get active webhooks from the database for an event."""
    permissions = {}
    required_permission = WebhookEventAsyncType.PERMISSIONS.get(
        event_type, WebhookEventSyncType.PERMISSIONS.get(event_type)
    )
    if required_permission:
        app_label, codename = required_permission.value.split(".")
        permissions["permissions__content_type__app_label"] = app_label
        permissions["permissions__codename"] = codename

    if webhooks is None:
        webhooks = Webhook.objects.all()

    print("permissions+++++++++++++")
    print(permissions)
    print("webhooks++++++++++")
    print([vars(w) for w in webhooks])
    print("event_type+++++++++++")
    print(event_type)

    all_apps = App.objects.all()
    for a in all_apps:
        print("vars(a)+++++++++++++++++")
        print(vars(a))


    apps = App.objects.filter(is_active=True, **permissions)
    event_types = [event_type]
    if event_type in WebhookEventAsyncType.ALL:
        event_types.append(WebhookEventAsyncType.ANY)
    print("apps++++++++")
    print(apps)
    print("event_types++++++++")
    print(event_types)
    webhook_events = WebhookEvent.objects.filter(event_type__in=event_types)
    print("webhook_events++++++++++++")
    print(webhook_events)
    return (
        webhooks.filter(
            Q(is_active=True, app__in=apps)
            & Q(Exists(webhook_events.filter(webhook_id=OuterRef("id"))))
        )
        .select_related("app")
        .prefetch_related("app__permissions__content_type")
    )


def get_base_price(price: TaxedMoney, include_taxes_in_prices: bool) -> Decimal:
    if include_taxes_in_prices:
        return price.gross.amount
    return price.net.amount
