import json

import graphene
import pytest
from graphene import Node

# from .....attribute.utils import associate_attribute_values_to_instance
# from .....core.taxes import TaxType
# from .....plugins.manager import PluginsManager
from .....initiative.models import InitiativeMedia, InitiativeTranslation
# from .....initiative.models import InitiativeMedia, InitiativeTranslation
from ....tests.utils import get_graphql_content


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_initiative_details(initiative_with_image, api_client, count_queries, channel_USD):
#     query = """
#         fragment BasicInitiativeFields on Initiative {
#           id
#           name
#           thumbnail {
#             url
#             alt
#           }
#           thumbnail2x: thumbnail(size: 510) {
#             url
#           }
#         }
#
#         fragment InitiativeVariantFields on InitiativeVariant {
#           id
#           sku
#           name
#           pricing {
#             discountLocalCurrency {
#               currency
#               gross {
#                 amount
#               }
#             }
#             price {
#               currency
#               gross {
#                 amount
#               }
#             }
#             priceUndiscounted {
#               currency
#               gross {
#                 amount
#               }
#             }
#             priceLocalCurrency {
#               currency
#               gross {
#                 amount
#               }
#             }
#           }
#           attributes {
#             attribute {
#               id
#               name
#             }
#             values {
#               id
#               name
#               value: name
#             }
#           }
#           media {
#             id
#             url
#             type
#             alt
#           }
#           images {
#             id
#             url
#             alt
#           }
#         }
#
#         query InitiativeDetails($id: ID!, $channel: String) {
#           initiative(id: $id, channel: $channel) {
#             ...BasicInitiativeFields
#             description
#             category {
#               id
#               name
#               initiatives(first: 4, channel: $channel) {
#                 edges {
#                   node {
#                     ...BasicInitiativeFields
#                     category {
#                       id
#                       name
#                     }
#                     pricing {
#                       priceRange {
#                         start{
#                           currency
#                           gross {
#                             amount
#                           }
#                         }
#                         stop{
#                           currency
#                           gross {
#                             amount
#                           }
#                         }
#                       }
#                       priceRangeUndiscounted {
#                         start{
#                           currency
#                           gross {
#                             amount
#                           }
#                         }
#                         stop{
#                           currency
#                           gross {
#                             amount
#                           }
#                         }
#                       }
#                       priceRangeLocalCurrency {
#                         start{
#                           currency
#                           gross {
#                             amount
#                           }
#                         }
#                         stop{
#                           currency
#                           gross {
#                             amount
#                           }
#                         }
#                       }
#                     }
#                   }
#                 }
#               }
#             }
#             media {
#               id
#             }
#             images {
#               id
#             }
#             variants {
#               ...InitiativeVariantFields
#             }
#             seoDescription
#             seoTitle
#             isAvailable
#           }
#         }
#     """
#     initiative = initiative_with_image
#     variant = initiative_with_image.variants.first()
#     media = initiative_with_image.get_first_image()
#     media.variant_media.create(variant=variant)
#
#     variables = {
#         "id": Node.to_global_id("Initiative", initiative.pk),
#         "channel": channel_USD.slug,
#     }
#     get_graphql_content(api_client.post_graphql(query, variables))


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_retrieve_initiative_attributes(
#     initiative_list, api_client, count_queries, channel_USD
# ):
#     query = """
#         query($sortBy: InitiativeOrder, $channel: String) {
#           initiatives(first: 10, sortBy: $sortBy, channel: $channel) {
#             edges {
#               node {
#                 id
#                 attributes {
#                   attribute {
#                     id
#                   }
#                 }
#               }
#             }
#           }
#         }
#     """
#
#     variables = {"channel": channel_USD.slug}
#     get_graphql_content(api_client.post_graphql(query, variables))


@pytest.mark.django_db
@pytest.mark.count_queries(autouse=False)
def test_retrieve_initiative_images(initiative_list, api_client, count_queries):
# def test_retrieve_initiative_images(initiative_list, api_client, count_queries, channel_USD):
    query = """
        query($sortBy: InitiativeOrder) {
          initiatives(first: 10, sortBy: $sortBy) {
            edges {
              node {
                id
                images {
                  id
                }
              }
            }
          }
        }
    """

    variables = {}
    get_graphql_content(api_client.post_graphql(query, variables))


@pytest.mark.django_db
@pytest.mark.count_queries(autouse=False)
def test_retrieve_initiative_media(initiative_list, api_client, count_queries):
# def test_retrieve_initiative_media(initiative_list, api_client, count_queries, channel_USD):
    query = """
        query($sortBy: InitiativeOrder) {
          initiatives(first: 10, sortBy: $sortBy) {
            edges {
              node {
                id
                media {
                  id
                }
              }
            }
          }
        }
    """

    variables = {}
    get_graphql_content(api_client.post_graphql(query, variables))


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_retrieve_channel_listings(
#     initiative_list_with_many_channels,
#     staff_api_client,
#     count_queries,
#     permission_manage_initiatives,
#     channel_USD,
# ):
#     query = """
#         query($channel: String) {
#           initiatives(first: 10, channel: $channel) {
#             edges {
#               node {
#                 id
#                 channelListings {
#                   publishedAt
#                   isPublished
#                   channel{
#                     slug
#                     currencyCode
#                     name
#                     isActive
#                   }
#                   visibleInListings
#                   discountedPrice{
#                     amount
#                     currency
#                   }
#                   purchaseCost{
#                     start{
#                       amount
#                     }
#                     stop{
#                       amount
#                     }
#                   }
#                   margin{
#                     start
#                     stop
#                   }
#                   isAvailableForPurchase
#                   availableForPurchaseAt
#                   pricing {
#                     priceRangeUndiscounted {
#                       start {
#                         gross {
#                           amount
#                           currency
#                         }
#                       }
#                       stop {
#                         gross {
#                           amount
#                           currency
#                         }
#                       }
#                     }
#                   }
#                 }
#               }
#             }
#           }
#         }
#     """
#
#     variables = {"channel": channel_USD.slug}
#     get_graphql_content(
#         staff_api_client.post_graphql(
#             query,
#             variables,
#             permissions=(permission_manage_initiatives,),
#             check_no_permissions=False,
#         )
#     )
#
#
# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_retrive_initiatives_with_initiative_types_and_attributes(
#     initiative_list,
#     api_client,
#     count_queries,
#     channel_USD,
# ):
#     query = """
#         query($channel: String) {
#           initiatives(first: 10, channel: $channel) {
#             edges {
#               node {
#                 id
#                   initiativeType {
#                     name
#                   initiativeAttributes {
#                     name
#                   }
#                   variantAttributes {
#                     name
#                   }
#                 }
#               }
#             }
#           }
#         }
#     """
#     variables = {"channel": channel_USD.slug}
#     get_graphql_content(api_client.post_graphql(query, variables))


def test_initiative_create(
    staff_api_client,
    # description_json,
    permission_manage_initiatives,
    count_queries,
):
    query = """
    mutation createInitiative($input: InitiativeCreateInput!) {
        initiativeCreate(input: $input) {
            initiative {
                id
                title
                slug
            }
            errors {
                field
                code
                message
                attributes
            }
        }
    }
    """
    # description_json = json.dumps(description_json)

    initiative_title = "test name"
    initiative_slug = "initiative-test-slug"

    # test creating root initiative
    variables = {
        "input": {
            "title": initiative_title,
            "slug": initiative_slug,
            # "description": description_json,
        }
    }

    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_initiatives]
    )
    content = get_graphql_content(response)
    assert not content["data"]["initiativeCreate"]["errors"]


# def test_update_initiative(
#     settings,
#     staff_api_client,
#     category,
#     non_default_category,
#     collection_list,
#     initiative_with_variant_with_two_attributes,
#     other_description_json,
#     permission_manage_initiatives,
#     monkeypatch,
#     count_queries,
# ):
#     query = """
#     mutation updateInitiative($initiativeId: ID!, $input: InitiativeInput!) {
#         initiativeUpdate(id: $initiativeId, input: $input) {
#                 initiative {
#                     category {
#                         name
#                     }
#                     rating
#                     description
#                     chargeTaxes
#                     variants {
#                         name
#                     }
#                     taxType {
#                         taxCode
#                         description
#                     }
#                     name
#                     slug
#                     initiativeType {
#                         name
#                     }
#                     attributes {
#                         attribute {
#                             id
#                             name
#                         }
#                         values {
#                             id
#                             name
#                             slug
#                             reference
#                             file {
#                                 url
#                                 contentType
#                             }
#                         }
#                     }
#                 }
#                 errors {
#                     message
#                     field
#                     code
#                 }
#             }
#         }
#     """
#     initiative = initiative_with_variant_with_two_attributes
#     for collection in collection_list:
#         collection.initiatives.add(initiative)
#     other_description_json = json.dumps(other_description_json)
#     settings.PLUGINS = ["pint.plugins.webhook.plugin.WebhookPlugin"]
#
#     initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
#     category_id = graphene.Node.to_global_id("Category", non_default_category.pk)
#     initiative_name = "updated name"
#     initiative_slug = "updated-initiative"
#     initiative_charge_taxes = True
#     initiative_tax_rate = "STANDARD"
#
#     # # Mock tax interface with fake response from tax gateway
#     # monkeypatch.setattr(
#     #     PluginsManager,
#     #     "get_tax_code_from_object_meta",
#     #     lambda self, x: TaxType(description="", code=initiative_tax_rate),
#     # )
#
#     variables = {
#         "initiativeId": initiative_id,
#         "input": {
#             "category": category_id,
#             "name": initiative_name,
#             "slug": initiative_slug,
#             "description": other_description_json,
#             "chargeTaxes": initiative_charge_taxes,
#             "taxCode": initiative_tax_rate,
#         },
#     }
#
#     response = staff_api_client.post_graphql(
#         query, variables, permissions=[permission_manage_initiatives]
#     )
#     content = get_graphql_content(response)
#     data = content["data"]["initiativeUpdate"]
#     assert not data["errors"]


QUERY_INITIATIVES_WITH_FILTER = """
    query ($filter: InitiativeFilterInput){
        initiatives(
            filter: $filter,
            first: 20,
        ) {
            edges {
                node {
                    name
                }
            }
        }
    }
"""


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_filter_initiatives_by_attributes(
#     api_client, initiative_list, channel_USD, count_queries
# ):
#     initiative = initiative_list[0]
#     attr_assignment = initiative.attributes.first()
#     attr = attr_assignment.attribute
#     variables = {
#         "channel": channel_USD.slug,
#         "filter": {
#             "attributes": [
#                 {"slug": attr.slug, "values": [attr_assignment.values.first().slug]}
#             ]
#         },
#     }
#     get_graphql_content(api_client.post_graphql(QUERY_INITIATIVES_WITH_FILTER, variables))


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_filter_initiatives_by_numeric_attributes(
#     api_client, initiative_list, numeric_attribute, channel_USD, count_queries
# ):
#     initiative = initiative_list[0]
#     initiative.initiative_type.initiative_attributes.add(numeric_attribute)
#     associate_attribute_values_to_instance(
#         initiative, numeric_attribute, *numeric_attribute.values.all()
#     )
#     variables = {
#         "channel": channel_USD.slug,
#         "filter": {
#             "attributes": [
#                 {
#                     "slug": numeric_attribute.slug,
#                     "valuesRange": {
#                         "gte": 10,
#                         "lte": 20,
#                     },
#                 }
#             ]
#         },
#     }
#     get_graphql_content(api_client.post_graphql(QUERY_INITIATIVES_WITH_FILTER, variables))
#
#
# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_filter_initiatives_by_boolean_attributes(
#     api_client, initiative_list, boolean_attribute, channel_USD, count_queries
# ):
#     initiative = initiative_list[0]
#     initiative.initiative_type.initiative_attributes.add(boolean_attribute)
#     associate_attribute_values_to_instance(
#         initiative, boolean_attribute, *boolean_attribute.values.all()
#     )
#     variables = {
#         "channel": channel_USD.slug,
#         "filter": {
#             "attributes": [
#                 {
#                     "slug": boolean_attribute.slug,
#                     "boolean": True,
#                 }
#             ]
#         },
#     }
#     get_graphql_content(api_client.post_graphql(QUERY_INITIATIVES_WITH_FILTER, variables))
#
#
# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_filter_initiatives_by_gift_card(
#     staff_api_client,
#     initiative_list,
#     boolean_attribute,
#     channel_USD,
#     count_queries,
#     shippable_gift_card_initiative,
# ):
#     variables = {"channel": channel_USD.slug, "filter": {"giftCard": True}}
#
#     get_graphql_content(
#         staff_api_client.post_graphql(QUERY_INITIATIVES_WITH_FILTER, variables)
#     )


@pytest.mark.django_db
@pytest.mark.count_queries(autouse=False)
def test_initiative_translations(api_client, initiative_list, count_queries):
# def test_initiative_translations(api_client, initiative_list, channel_USD, count_queries):
    query = """
      query() {
        initiatives(first: 20) {
          edges {
            node {
              name
              translation(languageCode: EN) {
                name
              }
            }
          }
        }
      }
    """
    translations = []
    for initiative in initiative_list:
        translations.append(InitiativeTranslation(initiative=initiative, language_code="en"))
    InitiativeTranslation.objects.bulk_create(translations)

    variables = {}
    get_graphql_content(api_client.post_graphql(query, variables))


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_initiatives_for_federation_query_count(
#     api_client,
#     initiative,
#     shippable_gift_card_initiative,
#     channel_USD,
#     django_assert_num_queries,
#     count_queries,
# ):
#     query = """
#       query GetInitiativeInFederation($representations: [_Any]) {
#         _entities(representations: $representations) {
#           __typename
#           ... on Initiative {
#             id
#             name
#           }
#         }
#       }
#     """
#
#     variables = {
#         "representations": [
#             {
#                 "__typename": "Initiative",
#                 "id": graphene.Node.to_global_id("Initiative", initiative.pk),
#                 "channel": channel_USD.slug,
#             },
#         ],
#     }
#
#     with django_assert_num_queries(3):
#         response = api_client.post_graphql(query, variables)
#         content = get_graphql_content(response)
#         assert len(content["data"]["_entities"]) == 1
#
#     variables = {
#         "representations": [
#             {
#                 "__typename": "Initiative",
#                 "id": graphene.Node.to_global_id("Initiative", initiative.pk),
#                 "channel": channel_USD.slug,
#             },
#             {
#                 "__typename": "Initiative",
#                 "id": graphene.Node.to_global_id(
#                     "Initiative", shippable_gift_card_initiative.pk
#                 ),
#                 "channel": channel_USD.slug,
#             },
#         ],
#     }
#
#     with django_assert_num_queries(3):
#         response = api_client.post_graphql(query, variables)
#         content = get_graphql_content(response)
#         assert len(content["data"]["_entities"]) == 2


# Todo: fix federation and _Entity tipe and fix this test
# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_initiatives_media_for_federation_query_count(
#     api_client,
#     initiative,
#     image,
#     media_root,
#     django_assert_num_queries,
#     count_queries,
# ):
#     medias = InitiativeMedia.objects.bulk_create(
#         [
#             InitiativeMedia(initiative=initiative, image=image),
#             InitiativeMedia(initiative=initiative, image=image),
#             InitiativeMedia(initiative=initiative, image=image),
#         ]
#     )
#
#     query = """
#       query GetInitiativeMediaInFederation($representations: [_Any]) {
#         _entities(representations: $representations) {
#           __typename
#           ... on InitiativeMedia {
#             id
#             url
#           }
#         }
#       }
#     """
#
#     variables = {
#         "representations": [
#             {
#                 "__typename": "InitiativeMedia",
#                 "id": graphene.Node.to_global_id("InitiativeMedia", medias[0].pk),
#             },
#         ],
#     }
#
#     with django_assert_num_queries(1):
#         response = api_client.post_graphql(query, variables)
#         content = get_graphql_content(response)
#         assert len(content["data"]["_entities"]) == 1
#
#     variables = {
#         "representations": [
#             {
#                 "__typename": "InitiativeMedia",
#                 "id": graphene.Node.to_global_id("InitiativeMedia", media.pk),
#             }
#             for media in medias
#         ],
#     }
#
#     with django_assert_num_queries(1):
#         response = api_client.post_graphql(query, variables)
#         content = get_graphql_content(response)
#         assert len(content["data"]["_entities"]) == 3


# @pytest.mark.django_db
# @pytest.mark.count_queries(autouse=False)
# def test_initiatives_types_for_federation_query_count(
#     api_client,
#     initiative_type,
#     initiative_type_without_variant,
#     django_assert_num_queries,
#     count_queries,
# ):
#     query = """
#       query GetInitiativeTypeInFederation($representations: [_Any]) {
#         _entities(representations: $representations) {
#           __typename
#           ... on InitiativeType {
#             id
#             name
#           }
#         }
#       }
#     """
#
#     variables = {
#         "representations": [
#             {
#                 "__typename": "InitiativeType",
#                 "id": graphene.Node.to_global_id("InitiativeType", initiative_type.pk),
#             },
#         ],
#     }
#
#     with django_assert_num_queries(1):
#         response = api_client.post_graphql(query, variables)
#         content = get_graphql_content(response)
#         assert len(content["data"]["_entities"]) == 1
#
#     variables = {
#         "representations": [
#             {
#                 "__typename": "InitiativeType",
#                 "id": graphene.Node.to_global_id("InitiativeType", initiative_type.pk),
#             },
#             {
#                 "__typename": "InitiativeType",
#                 "id": graphene.Node.to_global_id(
#                     "InitiativeType", initiative_type_without_variant.pk
#                 ),
#             },
#         ],
#     }
#
#     with django_assert_num_queries(1):
#         response = api_client.post_graphql(query, variables)
#         content = get_graphql_content(response)
#         assert len(content["data"]["_entities"]) == 2
