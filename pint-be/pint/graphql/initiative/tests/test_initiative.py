# import json
# import os
# from datetime import datetime, timedelta
# from decimal import Decimal
import json
from unittest.mock import ANY, MagicMock, patch

# import before_after
import graphene
import pytest
# import pytz
# from django.core.exceptions import ValidationError
from django.core.files import File
# from django.db import transaction
# from django.db.models import Sum
# from django.utils import timezone
# from django.utils.dateparse import parse_datetime
# from django.utils.functional import SimpleLazyObject
# from django.utils.html import strip_tags
# from django.utils.text import slugify
# from freezegun import freeze_time
# from graphql_relay import to_global_id
# from measurement.measures import Weight
# from prices import Money, TaxedMoney

# from ....attribute import AttributeInputType, AttributeType
# from ....attribute.models import Attribute, AttributeValue
# from ....attribute.utils import associate_attribute_values_to_instance
# from ....core.postgres import FlatConcatSearchVector
# from ....core.taxes import TaxType
# from ....core.units import MeasurementUnits, WeightUnits
# from ....order import OrderEvents, OrderStatus
# from ....order.models import OrderEvent, OrderLine
# from ....plugins.manager import PluginsManager, get_plugins_manager
# from ....product import ProductMediaTypes, ProductTypeKind
# from ....product.error_codes import ProductErrorCode
# from ....initiative.models import (
#     Initiative,
# )
# from ....initiative.search import prepare_initiative_search_vector_value
# from ....initiative.tests.utils import create_image, create_pdf_file_with_image_ext
# from ....initiative.utils.availability import get_variant_availability
# from ....initiative.utils.costs import get_initiative_costs_data
from ....tests.consts import TEST_SERVER_DOMAIN
from ....tests.utils import dummy_editorjs, flush_post_commit_hooks
from ....thumbnail.models import Thumbnail
# from ....warehouse.models import Allocation, Stock, Warehouse
# from ....webhook.event_types import WebhookEventAsyncType
# from ....webhook.payloads import generate_product_deleted_payload
# from ...core.enums import AttributeErrorCode, ReportingPeriod, ThumbnailFormatEnum
from ...tests.utils import (
    # assert_no_permission,
    get_graphql_content,
    get_graphql_content_from_response,
    # get_multipart_request_body,
)
# from ..bulk_mutations.products import ProductVariantStocksUpdate
# from ..enums import VariantAttributeScope
# from ..utils import create_stocks


@pytest.fixture
def query_initiatives_with_filter():
    query = """
        query ($filter: InitiativeFilterInput!) {
          products(first:5, filter: $filter) {
            edges{
              node{
                id
                title
              }
            }
          }
        }
        """
    return query


QUERY_FETCH_ALL_INITIATIVES = """
    query (){
        initiatives(first: 10) {
            totalCount
            edges {
                node {
                    id
                    title
                }
            }
        }
    }
"""


QUERY_INITIATIVE = """
    query ($id: ID, $slug: String){
        initiative(
            id: $id,
            slug: $slug,
        ) {
            id
            title
        }
    }
    """


def test_initiative_query_by_id_as_staff_user(
    staff_api_client, permission_manage_initiatives, initiative
):
    variables = {
        "id": graphene.Node.to_global_id("Initiative", initiative.pk),
    }
    response = staff_api_client.post_graphql(
        QUERY_INITIATIVE,
        variables=variables,
        permissions=(permission_manage_initiatives,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    initiative_data = content["data"]["initiative"]
    assert initiative_data is not None
    assert initiative_data["title"] == initiative.title


def test_initiative_query_description(
    staff_api_client, permission_manage_products, product, channel_USD
):
    query = """
        query ($id: ID, $slug: String, $channel:String){
            product(
                id: $id,
                slug: $slug,
                channel: $channel
            ) {
                id
                name
                description
                descriptionJson
            }
        }
        """
    description = dummy_editorjs("Test description.", json_format=True)
    product.description = dummy_editorjs("Test description.")
    product.save()
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
        "channel": channel_USD.slug,
    }

    response = staff_api_client.post_graphql(
        query,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is not None
    assert product_data["description"] == description
    assert product_data["descriptionJson"] == description


def test_product_query_with_no_description(
    staff_api_client, permission_manage_products, product, channel_USD
):
    query = """
        query ($id: ID, $slug: String, $channel:String){
            product(
                id: $id,
                slug: $slug,
                channel: $channel
            ) {
                id
                name
                description
                descriptionJson
            }
        }
        """
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
        "channel": channel_USD.slug,
    }

    response = staff_api_client.post_graphql(
        query,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is not None
    assert product_data["description"] is None
    assert product_data["descriptionJson"] == "{}"


# def test_product_query_by_id_not_available_as_staff_user(
#     staff_api_client, permission_manage_products, product, channel_USD
# ):
#     variables = {
#         "id": graphene.Node.to_global_id("Product", product.pk),
#         "channel": channel_USD.slug,
#     }
#     ProductChannelListing.objects.filter(product=product, channel=channel_USD).update(
#         is_published=False
#     )
#
#     response = staff_api_client.post_graphql(
#         QUERY_PRODUCT,
#         variables=variables,
#         permissions=(permission_manage_products,),
#         check_no_permissions=False,
#     )
#     content = get_graphql_content(response)
#     product_data = content["data"]["product"]
#     assert product_data is not None
#     assert product_data["name"] == product.name
#
#
# def test_product_query_by_id_not_existing_in_channel_as_staff_user(
#     staff_api_client, permission_manage_products, product, channel_USD
# ):
#     variables = {
#         "id": graphene.Node.to_global_id("Product", product.pk),
#         "channel": channel_USD.slug,
#     }
#     ProductChannelListing.objects.filter(product=product, channel=channel_USD).delete()
#
#     response = staff_api_client.post_graphql(
#         QUERY_PRODUCT,
#         variables=variables,
#         permissions=(permission_manage_products,),
#         check_no_permissions=False,
#     )
#     content = get_graphql_content(response)
#     product_data = content["data"]["product"]
#     assert product_data is None
#
#
# def test_product_query_by_id_as_staff_user_without_channel_slug(
#     staff_api_client, permission_manage_products, product, channel_USD
# ):
#     variables = {
#         "id": graphene.Node.to_global_id("Product", product.pk),
#     }
#     ProductChannelListing.objects.filter(product=product, channel=channel_USD).delete()
#
#     response = staff_api_client.post_graphql(
#         QUERY_PRODUCT,
#         variables=variables,
#         permissions=(permission_manage_products,),
#         check_no_permissions=False,
#     )
#     content = get_graphql_content(response)
#     product_data = content["data"]["product"]
#     assert product_data is not None
#     assert product_data["name"] == product.name


def test_product_query_by_id_available_as_app(
    app_api_client, permission_manage_products, product, channel_USD
):
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
        "channel": channel_USD.slug,
    }

    response = app_api_client.post_graphql(
        QUERY_PRODUCT,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is not None
    assert product_data["name"] == product.name


@pytest.mark.parametrize("id", ["'", "abc"])
def test_product_query_by_invalid_id(
    id, staff_api_client, permission_manage_products, product, channel_USD
):
    variables = {
        "id": id,
        "channel": channel_USD.slug,
    }
    ProductChannelListing.objects.filter(product=product, channel=channel_USD).delete()

    response = staff_api_client.post_graphql(
        QUERY_PRODUCT,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content_from_response(response)
    assert "errors" in content
    assert content["errors"][0]["message"] == (f"Couldn't resolve id: {id}.")


QUERY_PRODUCT_BY_ID = """
    query ($id: ID, $channel: String){
        product(id: $id, channel: $channel) {
            id
            variants {
                id
            }
        }
    }
"""


def test_initiative_query_by_id_as_user(
    user_api_client, permission_manage_products, product, channel_USD
):
    query = QUERY_PRODUCT_BY_ID
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
        "channel": channel_USD.slug,
    }

    response = user_api_client.post_graphql(
        query,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is not None
    expected_variants = [
        {
            "id": graphene.Node.to_global_id(
                "ProductVariant", product.variants.first().pk
            )
        }
    ]
    assert product_data["variants"] == expected_variants


def test_product_query_invalid_id(user_api_client, product, channel_USD):
    product_id = "'"
    variables = {
        "id": product_id,
        "channel": channel_USD.slug,
    }
    response = user_api_client.post_graphql(QUERY_PRODUCT_BY_ID, variables)
    content = get_graphql_content_from_response(response)
    assert len(content["errors"]) == 1
    assert content["errors"][0]["message"] == f"Couldn't resolve id: {product_id}."
    assert content["data"]["product"] is None


def test_product_query_object_with_given_id_does_not_exist(
    user_api_client, product, channel_USD
):
    product_id = graphene.Node.to_global_id("Product", -1)
    variables = {
        "id": product_id,
        "channel": channel_USD.slug,
    }
    response = user_api_client.post_graphql(QUERY_PRODUCT_BY_ID, variables)
    content = get_graphql_content(response)
    assert content["data"]["product"] is None


def test_product_query_with_invalid_object_type(user_api_client, product, channel_USD):
    product_id = graphene.Node.to_global_id("Collection", product.pk)
    variables = {
        "id": product_id,
        "channel": channel_USD.slug,
    }
    response = user_api_client.post_graphql(QUERY_PRODUCT_BY_ID, variables)
    content = get_graphql_content(response)
    assert content["data"]["product"] is None


def test_product_query_by_id_not_available_as_app(
    app_api_client, permission_manage_products, product, channel_USD
):
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
        "channel": channel_USD.slug,
    }
    ProductChannelListing.objects.filter(product=product, channel=channel_USD).update(
        is_published=False
    )

    response = app_api_client.post_graphql(
        QUERY_PRODUCT,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is not None
    assert product_data["name"] == product.name


def test_product_query_by_id_not_existing_in_channel_as_app(
    app_api_client, permission_manage_products, product, channel_USD
):
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
        "channel": channel_USD.slug,
    }
    ProductChannelListing.objects.filter(product=product, channel=channel_USD).delete()

    response = app_api_client.post_graphql(
        QUERY_PRODUCT,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is None


def test_product_query_by_id_as_app_without_channel_slug(
    app_api_client, permission_manage_products, product, channel_USD
):
    variables = {
        "id": graphene.Node.to_global_id("Product", product.pk),
    }
    ProductChannelListing.objects.filter(product=product, channel=channel_USD).delete()

    response = app_api_client.post_graphql(
        QUERY_PRODUCT,
        variables=variables,
        permissions=(permission_manage_products,),
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]
    assert product_data is not None
    assert product_data["name"] == product.name


def test_product_variants_without_sku_query_by_staff(
    staff_api_client, product, channel_USD
):
    product.variants.update(sku=None)
    product_id = graphene.Node.to_global_id("Product", product.pk)

    variables = {
        "id": product_id,
        "channel": channel_USD.slug,
    }

    response = staff_api_client.post_graphql(
        QUERY_PRODUCT_BY_ID,
        variables=variables,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]

    assert product_data is not None
    assert product_data["id"] == product_id

    variant = product.variants.first()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.pk)
    assert product_data["variants"] == [{"id": variant_id}]


def test_product_only_with_variants_without_sku_query_by_customer(
    user_api_client, product, channel_USD
):
    product.variants.update(sku=None)
    product_id = graphene.Node.to_global_id("Product", product.pk)

    variables = {
        "id": product_id,
        "channel": channel_USD.slug,
    }

    response = user_api_client.post_graphql(
        QUERY_PRODUCT_BY_ID,
        variables=variables,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]

    assert product_data is not None
    assert product_data["id"] == product_id

    variant = product.variants.first()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.pk)
    assert product_data["variants"] == [{"id": variant_id}]


def test_product_only_with_variants_without_sku_query_by_anonymous(
    api_client, product, channel_USD
):
    product.variants.update(sku=None)
    product_id = graphene.Node.to_global_id("Product", product.pk)

    variables = {
        "id": product_id,
        "channel": channel_USD.slug,
    }

    response = api_client.post_graphql(
        QUERY_PRODUCT_BY_ID,
        variables=variables,
    )
    content = get_graphql_content(response)
    product_data = content["data"]["product"]

    assert product_data is not None
    assert product_data["id"] == product_id

    variant = product.variants.first()
    variant_id = graphene.Node.to_global_id("ProductVariant", variant.pk)
    assert product_data["variants"] == [{"id": variant_id}]


QUERY_PRODUCT_BY_ID_WITH_MEDIA = """
    query ($id: ID, $channel: String, $size: Int, $format: ThumbnailFormatEnum){
        product(id: $id, channel: $channel) {
            media {
                id
            }
            thumbnail(size: $size, format: $format) {
                url
                alt
            }
            variants {
                id
                name
                media {
                    id
                }
            }
        }
    }
"""


def test_query_product_thumbnail_with_size_and_format_proxy_url_returned(
    staff_api_client, product_with_image, channel_USD
):
    # given
    format = ThumbnailFormatEnum.WEBP.name

    id = graphene.Node.to_global_id("Product", product_with_image.pk)
    variables = {
        "id": id,
        "size": 120,
        "format": format,
        "channel": channel_USD.slug,
    }

    # when
    response = staff_api_client.post_graphql(QUERY_PRODUCT_BY_ID_WITH_MEDIA, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["product"]
    product_media_id = graphene.Node.to_global_id(
        "ProductMedia", product_with_image.media.first().pk
    )
    expected_url = (
        f"http://{TEST_SERVER_DOMAIN}"
        f"/thumbnail/{product_media_id}/128/{format.lower()}/"
    )
    assert data["thumbnail"]["url"] == expected_url


def test_query_product_thumbnail_with_size_and_proxy_url_returned(
    staff_api_client, product_with_image, channel_USD
):
    # given
    id = graphene.Node.to_global_id("Product", product_with_image.pk)
    variables = {
        "id": id,
        "size": 120,
        "channel": channel_USD.slug,
    }

    # when
    response = staff_api_client.post_graphql(QUERY_PRODUCT_BY_ID_WITH_MEDIA, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["product"]
    product_media_id = graphene.Node.to_global_id(
        "ProductMedia", product_with_image.media.first().pk
    )
    assert (
        data["thumbnail"]["url"]
        == f"http://{TEST_SERVER_DOMAIN}/thumbnail/{product_media_id}/128/"
    )


def test_query_product_thumbnail_with_size_and_thumbnail_url_returned(
    staff_api_client, product_with_image, channel_USD
):
    # given
    product_media = product_with_image.media.first()

    thumbnail_mock = MagicMock(spec=File)
    thumbnail_mock.name = "thumbnail_image.jpg"
    Thumbnail.objects.create(
        product_media=product_media, size=128, image=thumbnail_mock
    )

    id = graphene.Node.to_global_id("Product", product_with_image.pk)
    variables = {
        "id": id,
        "size": 120,
        "channel": channel_USD.slug,
    }

    # when
    response = staff_api_client.post_graphql(QUERY_PRODUCT_BY_ID_WITH_MEDIA, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["product"]
    assert (
        data["thumbnail"]["url"]
        == f"http://{TEST_SERVER_DOMAIN}/media/thumbnails/{thumbnail_mock.name}"
    )


def test_query_product_thumbnail_only_format_provided_default_size_is_used(
    staff_api_client, product_with_image, channel_USD
):
    # given
    format = ThumbnailFormatEnum.WEBP.name

    id = graphene.Node.to_global_id("Product", product_with_image.pk)
    variables = {
        "id": id,
        "format": format,
        "channel": channel_USD.slug,
    }

    # when
    response = staff_api_client.post_graphql(QUERY_PRODUCT_BY_ID_WITH_MEDIA, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["product"]
    product_media_id = graphene.Node.to_global_id(
        "ProductMedia", product_with_image.media.first().pk
    )
    expected_url = (
        f"http://{TEST_SERVER_DOMAIN}"
        f"/thumbnail/{product_media_id}/256/{format.lower()}/"
    )
    assert data["thumbnail"]["url"] == expected_url


def test_query_product_thumbnail_no_product_media(
    staff_api_client, product, channel_USD
):
    # given
    id = graphene.Node.to_global_id("Product", product.pk)
    variables = {
        "id": id,
        "channel": channel_USD.slug,
    }

    # when
    response = staff_api_client.post_graphql(QUERY_PRODUCT_BY_ID_WITH_MEDIA, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["product"]
    assert not data["thumbnail"]


QUERY_COLLECTION_FROM_PRODUCT = """
    query ($id: ID, $channel:String){
        product(
            id: $id,
            channel: $channel
        ) {
            collections {
                name
            }
        }
    }
    """
