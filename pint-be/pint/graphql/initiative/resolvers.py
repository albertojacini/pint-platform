from django.db.models import Exists, OuterRef, Sum

# from ...channel.models import Channel
from ...core.db.utils import get_database_connection_name
from ...core.permissions import has_one_of_permissions
from ...core.tracing import traced_resolver
# from ...order import OrderStatus
# from ...order.models import Order
from ...initiative import models
from ...initiative.models import ALL_INITIATIVES_PERMISSIONS
# from ..channel import ChannelQsContext
from ..core.utils import from_global_id_or_error
from ..utils import get_user_or_app_from_context
from ..utils.filters import filter_by_period


# def resolve_category_by_id(id):
#     return models.Category.objects.filter(pk=id).first()
#
#
# def resolve_category_by_slug(slug):
#     return models.Category.objects.filter(slug=slug).first()
#
#
# def resolve_categories(_info, level=None):
#     qs = models.Category.objects.prefetch_related("children")
#     if level is not None:
#         qs = qs.filter(level=level)
#     return qs.distinct()
#
#
# def resolve_collection_by_id(_info, id, channel_slug, requestor):
#     return (
#         models.Collection.objects.visible_to_user(requestor, channel_slug=channel_slug)
#         .filter(id=id)
#         .first()
#     )
#
#
# def resolve_collection_by_slug(_info, slug, channel_slug, requestor):
#     return (
#         models.Collection.objects.visible_to_user(requestor, channel_slug)
#         .filter(slug=slug)
#         .first()
#     )
#
#
# def resolve_collections(info, channel_slug):
#     requestor = get_user_or_app_from_context(info.context)
#     qs = models.Collection.objects.visible_to_user(requestor, channel_slug)
#
#     return ChannelQsContext(qs=qs, channel_slug=channel_slug)
#
#
# def resolve_digital_content_by_id(id):
#     return models.DigitalContent.objects.filter(pk=id).first()
#
#
# def resolve_digital_contents(_info):
#     return models.DigitalContent.objects.all()


def resolve_initiative_by_id(info, id, channel_slug, requestor):
    database_connection_name = get_database_connection_name(info.context)
    return (
        models.Initiative.objects.using(database_connection_name)
        .visible_to_user(requestor, channel_slug=channel_slug)
        .filter(id=id)
        .first()
    )


def resolve_initiative_by_slug(info, initiative_slug, channel_slug, requestor):
    database_connection_name = get_database_connection_name(info.context)
    return (
        models.Initiative.objects.using(database_connection_name)
        .visible_to_user(requestor, channel_slug=channel_slug)
        .filter(slug=initiative_slug)
        .first()
    )


@traced_resolver
# def resolve_initiatives(info, requestor, channel_slug=None) -> ChannelQsContext:
def resolve_initiatives(info, requestor):
    database_connection_name = get_database_connection_name(info.context)
    qs = models.Initiative.objects.using(database_connection_name).visible_to_user(
        requestor
    )
    # if not has_one_of_permissions(requestor, ALL_INITIATIVES_PERMISSIONS):
    #     channels = Channel.objects.filter(slug=str(channel_slug))
    #     initiative_channel_listings = models.InitiativeChannelListing.objects.filter(
    #         Exists(channels.filter(pk=OuterRef("channel_id"))),
    #         visible_in_listings=True,
    #     )
    #     qs = qs.filter(
    #         Exists(initiative_channel_listings.filter(initiative_id=OuterRef("pk")))
    #     )
    # return ChannelQsContext(qs=qs, channel_slug=channel_slug)
    return qs


# @traced_resolver
# def resolve_variant_by_id(
#     _info, id, *, channel_slug, requestor, requestor_has_access_to_all
# ):
#     visible_initiatives = models.Initiative.objects.visible_to_user(
#         requestor, channel_slug
#     ).values_list("pk", flat=True)
#     qs = models.InitiativeVariant.objects.filter(initiative__id__in=visible_initiatives)
#     if not requestor_has_access_to_all:
#         qs = qs.available_in_channel(channel_slug)
#     return qs.filter(pk=id).first()
#
#
# def resolve_initiative_type_by_id(id):
#     return models.InitiativeType.objects.filter(pk=id).first()
#
#
# def resolve_initiative_types(_info):
#     return models.InitiativeType.objects.all()
#
#
# @traced_resolver
# def resolve_initiative_variant_by_sku(
#     _info, sku, channel_slug, requestor, requestor_has_access_to_all
# ):
#     visible_initiatives = models.Initiative.objects.visible_to_user(requestor, channel_slug)
#     qs = models.InitiativeVariant.objects.filter(initiative__id__in=visible_initiatives)
#     if not requestor_has_access_to_all:
#         visible_initiatives = visible_initiatives.annotate_visible_in_listings(
#             channel_slug
#         ).exclude(visible_in_listings=False)
#         qs = qs.filter(initiative__in=visible_initiatives).available_in_channel(channel_slug)
#     return qs.filter(sku=sku).first()
#
#
# @traced_resolver
# def resolve_initiative_variants(
#     _info, requestor_has_access_to_all, requestor, ids=None, channel_slug=None
# ) -> ChannelQsContext:
#     visible_initiatives = models.Initiative.objects.visible_to_user(requestor, channel_slug)
#     qs = models.InitiativeVariant.objects.filter(initiative__id__in=visible_initiatives)
#
#     if not requestor_has_access_to_all:
#         visible_initiatives = visible_initiatives.annotate_visible_in_listings(
#             channel_slug
#         ).exclude(visible_in_listings=False)
#         qs = qs.filter(initiative__in=visible_initiatives).available_in_channel(channel_slug)
#     if ids:
#         db_ids = [
#             from_global_id_or_error(node_id, "InitiativeVariant")[1] for node_id in ids
#         ]
#         qs = qs.filter(pk__in=db_ids)
#     return ChannelQsContext(qs=qs, channel_slug=channel_slug)
#
#
# def resolve_report_initiative_sales(period, channel_slug) -> ChannelQsContext:
#     qs = models.InitiativeVariant.objects.all()
#
#     # filter by period
#     qs = filter_by_period(qs, period, "order_lines__order__created_at")
#
#     # annotate quantity
#     qs = qs.annotate(quantity_ordered=Sum("order_lines__quantity"))
#
#     # filter by channel and order status
#     channels = Channel.objects.filter(slug=channel_slug).values("pk")
#     exclude_status = [OrderStatus.DRAFT, OrderStatus.CANCELED]
#     orders = Order.objects.exclude(status__in=exclude_status).filter(
#         Exists(channels.filter(pk=OuterRef("channel_id")).values("pk"))
#     )
#     qs = qs.filter(
#         Exists(orders.filter(pk=OuterRef("order_lines__order_id"))),
#         quantity_ordered__isnull=False,
#     )
#
#     # order by quantity ordered
#     qs = qs.order_by("-quantity_ordered")
#
#     return ChannelQsContext(qs=qs, channel_slug=channel_slug)
