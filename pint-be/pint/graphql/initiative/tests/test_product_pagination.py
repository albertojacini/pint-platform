import uuid
from decimal import Decimal

import graphene
import pytest

from ....initiative.models import (
    Initiative,
)
from ....tests.utils import dummy_editorjs
from ...tests.utils import get_graphql_content


@pytest.fixture
def products_for_pagination(
    product_type, color_attribute, category, warehouse, channel_USD
):
    product_type2 = ProductType.objects.create(
        name="Apple", kind=ProductTypeKind.NORMAL
    )
    products = Product.objects.bulk_create(
        [
            Product(
                name="Product1",
                slug="prod1",
                category=category,
                product_type=product_type2,
                description=dummy_editorjs("Test description 1."),
            ),
            Product(
                name="ProductProduct1",
                slug="prod_prod1",
                category=category,
                product_type=product_type,
            ),
            Product(
                name="ProductProduct2",
                slug="prod_prod2",
                category=category,
                product_type=product_type2,
            ),
            Product(
                name="Product2",
                slug="prod2",
                category=category,
                product_type=product_type,
                description=dummy_editorjs("Test description 2."),
            ),
            Product(
                name="Product3",
                slug="prod3",
                category=category,
                product_type=product_type2,
                description=dummy_editorjs("Test description 3."),
            ),
        ]
    )
    ProductChannelListing.objects.bulk_create(
        [
            ProductChannelListing(
                product=products[0],
                channel=channel_USD,
                is_published=True,
                discounted_price_amount=Decimal(5),
            ),
            ProductChannelListing(
                product=products[1],
                channel=channel_USD,
                is_published=True,
                discounted_price_amount=Decimal(15),
            ),
            ProductChannelListing(
                product=products[2],
                channel=channel_USD,
                is_published=False,
                discounted_price_amount=Decimal(4),
            ),
            ProductChannelListing(
                product=products[3],
                channel=channel_USD,
                is_published=True,
                discounted_price_amount=Decimal(7),
            ),
        ]
    )

    product_attrib_values = color_attribute.values.all()
    associate_attribute_values_to_instance(
        products[1], color_attribute, product_attrib_values[0]
    )
    associate_attribute_values_to_instance(
        products[3], color_attribute, product_attrib_values[1]
    )

    variants = ProductVariant.objects.bulk_create(
        [
            ProductVariant(
                product=products[0],
                sku=str(uuid.uuid4()).replace("-", ""),
                track_inventory=True,
            ),
            ProductVariant(
                product=products[1],
                sku=str(uuid.uuid4()).replace("-", ""),
                track_inventory=True,
            ),
            ProductVariant(
                product=products[2],
                sku=str(uuid.uuid4()).replace("-", ""),
                track_inventory=True,
            ),
            ProductVariant(
                product=products[3],
                sku=str(uuid.uuid4()).replace("-", ""),
                track_inventory=True,
            ),
            ProductVariant(
                product=products[4],
                sku=str(uuid.uuid4()).replace("-", ""),
                track_inventory=True,
            ),
        ]
    )
    ProductVariantChannelListing.objects.bulk_create(
        [
            ProductVariantChannelListing(
                variant=variants[0],
                channel=channel_USD,
                price_amount=Decimal(10),
                currency=channel_USD.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[1],
                channel=channel_USD,
                price_amount=Decimal(15),
                currency=channel_USD.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[2],
                channel=channel_USD,
                price_amount=Decimal(8),
                currency=channel_USD.currency_code,
            ),
            ProductVariantChannelListing(
                variant=variants[3],
                channel=channel_USD,
                price_amount=Decimal(7),
                currency=channel_USD.currency_code,
            ),
        ]
    )
    Stock.objects.bulk_create(
        [
            Stock(warehouse=warehouse, product_variant=variants[0], quantity=100),
            Stock(warehouse=warehouse, product_variant=variants[1], quantity=0),
            Stock(warehouse=warehouse, product_variant=variants[2], quantity=0),
        ]
    )

    return products


QUERY_PRODUCTS_PAGINATION = """
    query (
        $first: Int, $last: Int, $after: String, $before: String, $channel: String,
        $sortBy: ProductOrder, $filter: ProductFilterInput
    ){
        products (
            first: $first, last: $last, after: $after, before: $before,
            sortBy: $sortBy, filter: $filter, channel: $channel
        ) {
            edges {
                node {
                    name
                    slug
                }
            }
            pageInfo{
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }
"""


@pytest.mark.parametrize(
    "sort_by, products_order",
    [
        ({"field": "NAME", "direction": "ASC"}, ["Product1", "Product2", "Product3"]),
        (
            {"field": "NAME", "direction": "DESC"},
            ["ProductProduct2", "ProductProduct1", "Product3"],
        ),
        (
            {"field": "TYPE", "direction": "ASC"},
            ["Product1", "Product3", "ProductProduct2"],
        ),
    ],
)
def test_products_pagination_with_sorting(
    sort_by,
    products_order,
    staff_api_client,
    permission_manage_products,
    products_for_pagination,
):
    page_size = 3

    variables = {"first": page_size, "after": None, "sortBy": sort_by}
    response = staff_api_client.post_graphql(
        QUERY_PRODUCTS_PAGINATION,
        variables,
        permissions=[permission_manage_products],
        check_no_permissions=False,
    )
    content = get_graphql_content(response)
    products_nodes = content["data"]["products"]["edges"]
    assert products_order[0] == products_nodes[0]["node"]["name"]
    assert products_order[1] == products_nodes[1]["node"]["name"]
    assert products_order[2] == products_nodes[2]["node"]["name"]
    assert len(products_nodes) == page_size




def test_products_pagination_for_products_with_the_same_names_one_page(
    staff_api_client, permission_manage_products, category, product_type, channel_USD
):
    products = Product.objects.bulk_create(
        [
            Product(
                name="Product",
                slug="prod-1",
                category=category,
                product_type=product_type,
            ),
            Product(
                name="Product",
                slug="prod-2",
                category=category,
                product_type=product_type,
            ),
            Product(
                name="Product",
                slug="prod-3",
                category=category,
                product_type=product_type,
            ),
        ]
    )
    page_size = 3
    variables = {"first": page_size, "after": None}

    response = staff_api_client.post_graphql(
        QUERY_PRODUCTS_PAGINATION,
        variables,
        permissions=[permission_manage_products],
        check_no_permissions=False,
    )

    content = get_graphql_content(response)
    products_nodes = content["data"]["products"]["edges"]
    page_info = content["data"]["products"]["pageInfo"]

    assert len(products_nodes) == 3
    assert products_nodes[0]["node"]["slug"] == products[0].slug
    assert products_nodes[1]["node"]["slug"] == products[1].slug
    assert products_nodes[2]["node"]["slug"] == products[2].slug
    assert page_info["hasNextPage"] is False
