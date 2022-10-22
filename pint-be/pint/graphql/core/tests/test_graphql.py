from functools import partial
from unittest.mock import Mock

import graphene
import pytest
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import reverse
from graphql.error import GraphQLError
from graphql_relay import to_global_id

# from ....order import models as order_models
from ...core.utils import from_global_id_or_error
# from ...order.types import Order
from ...initiative.types import Initiative
from ...tests.utils import get_graphql_content
from ...utils import get_nodes


def test_middleware_dont_generate_sql_requests(db, client, settings, assert_num_queries):
    """When requesting on the GraphQL API endpoint, no SQL request should happen
    indirectly. This test ensures that."""

    # Enables the Graphql playground
    settings.DEBUG = True

    with assert_num_queries(0):
        response = client.get(reverse("api"))
        assert response.status_code == 200


def test_jwt_middleware(client, admin_user):
    user_details_query = """
        {
          me {
            email
          }
        }
    """

    create_token_query = """
        mutation {
          tokenCreate(email: "admin@example.com", password: "password") {
            token
          }
        }
    """

    api_url = reverse("api")
    api_client_post = partial(client.post, api_url, content_type="application/json")

    # test setting AnonymousUser on unauthorized request to API
    response = api_client_post(data={"query": user_details_query})
    repl_data = response.json()
    assert response.status_code == 200
    assert isinstance(response.wsgi_request.user, AnonymousUser)
    assert repl_data["data"]["me"] is None

    # test creating a token for admin user
    response = api_client_post(data={"query": create_token_query})
    repl_data = response.json()
    assert response.status_code == 200
    assert response.wsgi_request.user == admin_user
    token = repl_data["data"]["tokenCreate"]["token"]
    assert token is not None

    # test request with proper JWT token authorizes the request to API
    response = api_client_post(
        data={"query": user_details_query}, HTTP_AUTHORIZATION=f"JWT {token}"
    )
    repl_data = response.json()
    assert response.status_code == 200
    assert response.wsgi_request.user == admin_user
    assert "errors" not in repl_data
    assert repl_data["data"]["me"] == {"email": admin_user.email}


def test_real_query(user_api_client, initiative):
    query = """
    query Root($sortBy: InitiativeOrder, $first: Int) {
        initiatives(first: $first, sortBy: $sortBy) {

            ...InitiativeListFragmentQuery
            __typename
        }
    }

    fragment InitiativeListFragmentQuery on InitiativeCountableConnection {
        edges {
            node {
                ...InitiativeFragmentQuery
                __typename
            }
            __typename
        }
        pageInfo {
            hasNextPage
            __typename
        }
        __typename
    }

    fragment InitiativeFragmentQuery on Initiative {
        id
        title
        thumbnailUrl1x: thumbnail(size: 255){
            url
        }
        thumbnailUrl2x:     thumbnail(size: 510){
            url
        }
        __typename
    }
    """
    variables = {
        # "categoryId": graphene.Node.to_global_id("Category", category.id),
        "sortBy": {"field": "NAME", "direction": "ASC"},
        "first": 1,
        # "attributesFilter": [
        #     {"slug": f"{initiative_attr.slug}", "values": [f"{attr_value.slug}"]}
        # ],
        # "channel": channel_USD.slug,
    }
    response = user_api_client.post_graphql(query, variables)
    get_graphql_content(response)


def test_get_nodes(initiative_list):
    global_ids = [to_global_id("Initiative", initiative.pk) for initiative in initiative_list]
    # Make sure function works even if duplicated ids are provided
    global_ids.append(to_global_id("Initiative", initiative_list[0].pk))
    # Return initiatives corresponding to global ids
    initiatives = get_nodes(global_ids, Initiative)
    assert initiatives == initiative_list

    # Raise an error if requested id has no related database object
    nonexistent_item = Mock(type="Initiative", pk=-1)
    nonexistent_item_global_id = to_global_id(
        nonexistent_item.type, nonexistent_item.pk
    )
    global_ids.append(nonexistent_item_global_id)
    msg = "There is no node of type {} with pk {}".format(
        nonexistent_item.type, nonexistent_item.pk
    )
    with pytest.raises(AssertionError) as exc:
        get_nodes(global_ids, Initiative)

    assert exc.value.args == (msg,)
    global_ids.pop()

    # Raise an error if one of the node is of wrong type
    invalid_item = Mock(type="test", pk=-1)
    invalid_item_global_id = to_global_id(invalid_item.type, invalid_item.pk)
    global_ids.append(invalid_item_global_id)
    with pytest.raises(GraphQLError) as exc:
        get_nodes(global_ids, Initiative)

    assert exc.value.args == (f"Must receive Initiative id: {invalid_item_global_id}.",)

    # Raise an error if no nodes were found
    global_ids = []
    msg = f"Could not resolve to a node with the global id list of '{global_ids}'."
    with pytest.raises(Exception) as exc:
        get_nodes(global_ids, Initiative)

    assert exc.value.args == (msg,)

    # Raise an error if pass wrong ids
    global_ids = ["a", "bb"]
    msg = f"Could not resolve to a node with the global id list of '{global_ids}'."
    with pytest.raises(Exception) as exc:
        get_nodes(global_ids, Initiative)

    assert exc.value.args == (msg,)


# def test_get_nodes_for_order_with_int_id(order_list):
#     """Ensure that `get_nodes` returns correct nodes, when old id is used
#     for orders with the `use_old_id` flag set to True."""
#     order_models.Order.objects.update(use_old_id=True)
#
#     # given
#     global_ids = [to_global_id("Order", order.number) for order in order_list]
#
#     # Make sure function works even if duplicated ids are provided
#     global_ids.append(to_global_id("Order", order_list[0].number))
#
#     # when
#     orders = get_nodes(global_ids, Order)
#
#     # then
#     assert orders == order_list
#
#
# def test_get_nodes_for_order_with_uuid_id(order_list):
#     """Ensure that `get_nodes` returns correct nodes, when the new uuid order id
#     is used."""
#     # given
#     global_ids = [to_global_id("Order", order.pk) for order in order_list]
#
#     # Make sure function works even if duplicated ids are provided
#     global_ids.append(to_global_id("Order", order_list[0].pk))
#
#     # when
#     orders = get_nodes(global_ids, Order)
#
#     # then
#     assert orders == order_list
#
#
# def test_get_nodes_for_order_with_int_id_and_use_old_id_set_to_false(order_list):
#     """Ensure that `get_nodes` does not return nodes, when old id is used
#     for orders with `use_old_id` flag set to False."""
#     # given
#     global_ids = [to_global_id("Order", order.number) for order in order_list]
#
#     # Make sure function works even if duplicated ids are provided
#     global_ids.append(to_global_id("Order", order_list[0].pk))
#
#     # when
#     with pytest.raises(AssertionError):
#         get_nodes(global_ids, Order)
#
#
# def test_get_nodes_for_order_with_uuid_and_int_id(order_list):
#     """Ensure that `get_nodes` returns correct nodes,
#     when old and new order id is provided."""
#     # given
#     order_models.Order.objects.update(use_old_id=True)
#     global_ids = [to_global_id("Order", order.pk) for order in order_list[:-1]]
#     global_ids.append(to_global_id("Order", order_list[-1].number))
#
#     # when
#     orders = get_nodes(global_ids, Order)
#
#     # then
#     assert orders == order_list


def test_from_global_id_or_error(initiative):
    invalid_id = "invalid"
    message = f"Couldn't resolve id: {invalid_id}."

    with pytest.raises(GraphQLError) as error:
        from_global_id_or_error(invalid_id)

    assert str(error.value) == message


def test_from_global_id_or_error_wth_invalid_type(initiative):
    initiative_id = graphene.Node.to_global_id("Initiative", initiative.id)
    message = "Must receive a InitiativeVariant id."

    with pytest.raises(GraphQLError) as error:
        from_global_id_or_error(initiative_id, "InitiativeVariant", raise_error=True)

    assert str(error.value) == message


def test_from_global_id_or_error_wth_type(initiative):
    expected_initiative_type = str(Initiative)
    expected_initiative_id = graphene.Node.to_global_id(expected_initiative_type, initiative.id)

    initiative_type, initiative_id = from_global_id_or_error(
        expected_initiative_id, expected_initiative_type
    )

    assert initiative_id == str(initiative.id)
    assert initiative_type == expected_initiative_type
