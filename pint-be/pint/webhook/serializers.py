from datetime import date, datetime
from typing import TYPE_CHECKING, Any, Dict, Iterable, List, Optional, Union

import graphene

# from ..attribute import AttributeEntityType, AttributeInputType
# from ..checkout import base_calculations
# from ..checkout.fetch import fetch_checkout_lines
from ..core.prices import quantize_price
# from ..discount import DiscountInfo
from ..initiative.models import Initiative

if TYPE_CHECKING:
    # # pylint: disable=unused-import
    # from ..checkout.fetch import CheckoutInfo, CheckoutLineInfo
    # from ..checkout.models import Checkout
    from ..initiative.models import InitiativeVariant


# def serialize_checkout_lines(
#     checkout: "Checkout", discounts: Optional[Iterable[DiscountInfo]] = None
# ) -> List[dict]:
#     data = []
#     channel = checkout.channel
#     currency = channel.currency_code
#     lines, _ = fetch_checkout_lines(checkout, prefetch_variant_attributes=True)
#     for line_info in lines:
#         variant = line_info.variant
#         channel_listing = line_info.channel_listing
#         collections = line_info.collections
#         initiative = variant.initiative
#         price_override = line_info.line.price_override
#         base_price = variant.get_price(
#             initiative,
#             collections,
#             channel,
#             channel_listing,
#             discounts or [],
#             price_override,
#         )
#         data.append(
#             {
#                 "sku": variant.sku,
#                 "variant_id": variant.get_global_id(),
#                 "quantity": line_info.line.quantity,
#                 "base_price": str(quantize_price(base_price.amount, currency)),
#                 "currency": currency,
#                 "full_name": variant.display_initiative(),
#                 "initiative_name": initiative.name,
#                 "variant_name": variant.name,
#                 "attributes": serialize_initiative_or_variant_attributes(variant),
#             }
#         )
#     return data
#
#
# def _get_checkout_line_payload_data(line_info: "CheckoutLineInfo") -> Dict[str, Any]:
#     line_id = graphene.Node.to_global_id("CheckoutLine", line_info.line.pk)
#     variant = line_info.variant
#     initiative = variant.initiative
#     return {
#         "id": line_id,
#         "sku": variant.sku,
#         "variant_id": variant.get_global_id(),
#         "quantity": line_info.line.quantity,
#         "charge_taxes": initiative.charge_taxes,
#         "full_name": variant.display_initiative(),
#         "initiative_name": initiative.name,
#         "variant_name": variant.name,
#         "initiative_metadata": line_info.initiative.metadata,
#         "initiative_type_metadata": line_info.initiative_type.metadata,
#     }
#
#
# def serialize_checkout_lines_for_tax_calculation(
#     checkout_info: "CheckoutInfo",
#     lines: Iterable["CheckoutLineInfo"],
#     discounts: Optional[Iterable[DiscountInfo]] = None,
# ) -> List[dict]:
#     channel = checkout_info.channel
#
#     return [
#         {
#             **_get_checkout_line_payload_data(line_info),
#             "unit_amount": quantize_price(
#                 base_calculations.calculate_base_line_unit_price(
#                     line_info, channel, discounts
#                 ).amount,
#                 checkout_info.checkout.currency,
#             ),
#             "total_amount": quantize_price(
#                 base_calculations.calculate_base_line_total_price(
#                     line_info, channel, discounts
#                 ).amount,
#                 checkout_info.checkout.currency,
#             ),
#         }
#         for line_info in lines
#     ]
#
#
# def serialize_initiative_or_variant_attributes(
#     initiative_or_variant: Union["Initiative", "InitiativeVariant"]
# ) -> List[Dict]:
#     data = []
#
#     def _prepare_reference(attribute, attr_value):
#         if attribute.input_type != AttributeInputType.REFERENCE:
#             return
#         if attribute.entity_type == AttributeEntityType.PAGE:
#             reference_pk = attr_value.reference_page_id
#         elif attribute.entity_type == AttributeEntityType.INITIATIVE:
#             reference_pk = attr_value.reference_initiative_id
#         else:
#             return None
#
#         reference_id = graphene.Node.to_global_id(attribute.entity_type, reference_pk)
#         return reference_id
#
#     for attr in initiative_or_variant.attributes.all():
#         attr_id = graphene.Node.to_global_id("Attribute", attr.assignment.attribute_id)
#         attribute = attr.assignment.attribute
#         attr_data: Dict[Any, Any] = {
#             "name": attribute.name,
#             "input_type": attribute.input_type,
#             "slug": attribute.slug,
#             "entity_type": attribute.entity_type,
#             "unit": attribute.unit,
#             "id": attr_id,
#             "values": [],
#         }
#
#         for attr_value in attr.values.all():
#             attr_slug = attr_value.slug
#             value: Dict[
#                 str, Optional[Union[str, datetime, date, bool, Dict[str, Any]]]
#             ] = {
#                 "name": attr_value.name,
#                 "slug": attr_slug,
#                 "value": attr_value.value,
#                 "rich_text": attr_value.rich_text,
#                 "boolean": attr_value.boolean,
#                 "date_time": attr_value.date_time,
#                 "date": attr_value.date_time,
#                 "reference": _prepare_reference(attribute, attr_value),
#                 "file": None,
#             }
#
#             if attr_value.file_url:
#                 value["file"] = {
#                     "content_type": attr_value.content_type,
#                     "file_url": attr_value.file_url,
#                 }
#             attr_data["values"].append(value)  # type: ignore
#
#         data.append(attr_data)
#
#     return data
