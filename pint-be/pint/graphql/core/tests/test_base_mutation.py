from unittest import mock

import graphene
import pytest
from django.core.exceptions import ImproperlyConfigured
from graphql import GraphQLError
from graphql.execution import ExecutionResult

from ....core.permissions import InitiativePermissions
# from pint.plugins.tests.sample_plugins import PluginSample

# from ....initiative.models import Initiative
from ....initiative.models import Initiative
# from ...initiative import types as initiative_types
# from ...initiative import types as initiative_types
from ...initiative import types as initiative_types
from ..mutations import BaseMutation
from . import ErrorTest


class Mutation(BaseMutation):
    title = graphene.Field(graphene.String)

    class Arguments:
        initiative_id = graphene.ID(required=True)
        # channel = graphene.String()

    class Meta:
        description = "Base mutation"
        error_type_class = ErrorTest

    @classmethod
    def perform_mutation(cls, _root, info, initiative_id):
        # Need to mock `app_middleware`
        info.context.app = None

        initiative = cls.get_node_or_error(
            info, initiative_id, field="initiative_id", only_type=initiative_types.Initiative
        )
        return Mutation(title=initiative.title)


class MutationWithCustomErrors(Mutation):
    class Meta:
        description = "Base mutation with custom errors"
        error_type_class = ErrorTest
        error_type_field = "custom_errors"


class RestrictedMutation(Mutation):
    """A mutation requiring the user to have given permissions"""

    auth_token = graphene.types.String(
        description="The newly created authentication token."
    )

    class Meta:
        permissions = (InitiativePermissions.MANAGE_INITIATIVES,)
        description = "Mutation requiring manage initiative user permission"
        error_type_class = ErrorTest


# class OrderMutation(BaseMutation):
#     number = graphene.Field(graphene.String)
#
#     class Arguments:
#         id = graphene.ID(required=True)
#         channel = graphene.String()
#
#     class Meta:
#         description = "Base mutation"
#         error_type_class = ErrorTest
#
#     @classmethod
#     def perform_mutation(cls, _root, info, id, channel):
#         # Need to mock `app_middleware`
#         info.context.app = None
#
#         initiative = cls.get_node_or_error(info, id, only_type=initiative_types.Initiative)
#         return OrderMutation(number=initiative.number)


class Mutations(graphene.ObjectType):
    test = Mutation.Field()
    test_with_custom_errors = MutationWithCustomErrors.Field()
    restricted_mutation = RestrictedMutation.Field()
    # test_initiative_mutation = OrderMutation.Field()


schema = graphene.Schema(
    mutation=Mutations,
    types=[initiative_types.Initiative],
)


def test_mutation_without_description_raises_error():
    with pytest.raises(ImproperlyConfigured):

        class MutationNoDescription(BaseMutation):
            title = graphene.Field(graphene.String)

            class Arguments:
                initiative_id = graphene.ID(required=True)


def test_mutation_without_error_type_class_raises_error():
    with pytest.raises(ImproperlyConfigured):

        class MutationNoDescription(BaseMutation):
            title = graphene.Field(graphene.String)
            description = "Base mutation with custom errors"

            class Arguments:
                initiative_id = graphene.ID(required=True)


TEST_MUTATION = """
    mutation testMutation($initiativeId: ID!) {
        test(initiativeId: $initiativeId) {
            title
            errors {
                field
                message
            }
        }
    }
"""


def test_resolve_id(initiative, schema_context):
    initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
    variables = {"initiativeId": initiative_id}
    result = schema.execute(
        TEST_MUTATION, variables=variables, context_value=schema_context
    )
    assert not result.errors
    assert result.data["test"]["title"] == initiative.title


def test_user_error_nonexistent_id(schema_context):
    variables = {"initiativeId": "not-really"}
    result = schema.execute(
        TEST_MUTATION, variables=variables, context_value=schema_context
    )
    assert not result.errors
    user_errors = result.data["test"]["errors"]
    assert user_errors
    assert user_errors[0]["field"] == "initiativeId"
    assert user_errors[0]["message"] == "Couldn't resolve id: not-really."


TEST_INITIATIVE_MUTATION = """
    mutation TestInitiativeMutation($id: ID!) {
        testInitiativeMutation(id: $id) {
            number
            errors {
                field
                message
            }
        }
    }
"""


# def test_initiative_mutation_resolve_uuid_id(initiative, schema_context):
#     """Ensure that initiative migrations can be perfromed with use of
#     new initiative id (uuid type)."""
#     initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
#     variables = {"id": initiative_id}
#     result = schema.execute(
#         TEST_MUTATION, variables=variables, context_value=schema_context
#     )
#     assert not result.errors
#     assert result.data["test"]["number"] == str(initiative.number)


# def test_initiative_mutation_for_old_int_id(initiative, schema_context):
#     """Ensure that initiative migrations for initiatives with `use_old_id` flag set to True,
#     can be perfromed with use of old initiative id (int type)."""
#     initiative.use_old_id = True
#     initiative.save(update_fields=["use_old_id"])
#
#     initiative_id = graphene.Node.to_global_id("Initiative", initiative.number)
#     variables = {"id": initiative_id}
#     result = schema.execute(
#         TEST_INITIATIVE_MUTATION, variables=variables, context_value=schema_context
#     )
#     assert not result.errors
#     assert result.data["testInitiativeMutation"]["number"] == str(initiative.number)


def test_mutation_custom_errors_default_value(initiative, schema_context):
    initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
    query = """
        mutation testMutation($initiativeId: ID!) {
            testWithCustomErrors(initiativeId: $initiativeId) {
                title
                errors {
                    field
                    message
                }
                customErrors {
                    field
                    message
                }
            }
        }
    """
    variables = {"initiativeId": initiative_id}
    result = schema.execute(query, variables=variables, context_value=schema_context)
    assert result.data["testWithCustomErrors"]["errors"] == []
    assert result.data["testWithCustomErrors"]["customErrors"] == []


# def test_user_error_id_of_different_type(initiative, schema_context):
#     # Test that get_node_or_error checks that the returned ID must be of
#     # proper type. Providing correct ID but of different type than expected
#     # should result in user error.
#     # variant = initiative.variants.first()
#     # variant_id = graphene.Node.to_global_id("InitiativeVariant", variant.pk)
#
#     variables = {"initiativeId": initiative.id}
#     result = schema.execute(
#         TEST_MUTATION, variables=variables, context_value=schema_context
#     )
#     assert not result.errors
#     user_errors = result.data["test"]["errors"]
#     assert user_errors
#     assert user_errors[0]["field"] == "initiativeId"
#     assert user_errors[0]["message"] == "Must receive a Initiative id."


def test_get_node_or_error_returns_null_for_empty_id():
    info = mock.Mock()
    response = Mutation.get_node_or_error(info, "", field="")
    assert response is None


# def test_mutation_plugin_perform_mutation_handles_graphql_error(
#     request,
#     settings,
#     plugin_configuration,
#     initiative,
#     channel_USD,
# ):
#     """Ensure when the mutation calls the method 'perform_mutation' on plugins,
#     the returned error "GraphQLError" is properly returned and transformed into a dict
#     """
#     settings.PLUGINS = [
#         "pint.plugins.tests.sample_plugins.PluginSample",
#     ]
#
#     schema_context = request.getfixturevalue("schema_context")
#
#     initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
#     variables = {"initiativeId": initiative_id}
#
#     with mock.patch.object(
#         PluginSample,
#         "perform_mutation",
#         return_value=GraphQLError("My Custom Error"),
#     ):
#         result = schema.execute(
#             TEST_MUTATION, variables=variables, context_value=schema_context
#         )
#     assert result.to_dict() == {
#         "data": {"test": None},
#         "errors": [
#             {
#                 "locations": [{"column": 9, "line": 3}],
#                 "message": "My Custom Error",
#                 "path": ["test"],
#             }
#         ],
#     }
#
#
# def test_mutation_plugin_perform_mutation_handles_custom_execution_result(
#     request,
#     settings,
#     plugin_configuration,
#     initiative,
#     channel_USD,
# ):
#     """Ensure when the mutation calls the method 'perform_mutation' on plugins,
#     if a "ExecutionResult" object is returned, then the GraphQL response contains it
#     """
#     settings.PLUGINS = [
#         "pint.plugins.tests.sample_plugins.PluginSample",
#     ]
#
#     schema_context = request.getfixturevalue("schema_context")
#
#     initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
#     variables = {"initiativeId": initiative_id}
#
#     with mock.patch.object(
#         PluginSample,
#         "perform_mutation",
#         return_value=ExecutionResult(data={}, errors=[GraphQLError("My Custom Error")]),
#     ):
#         result = schema.execute(
#             TEST_MUTATION, variables=variables, context_value=schema_context
#         )
#     assert result.to_dict() == {
#         "data": {"test": None},
#         "errors": [
#             {
#                 "locations": [{"column": 13, "line": 5}],
#                 "message": "My Custom Error",
#                 "path": ["test", "errors", 0],
#             }
#         ],
#     }
#
#
# @mock.patch.object(
#     PluginSample,
#     "perform_mutation",
#     return_value=ExecutionResult(data={}, errors=[GraphQLError("My Custom Error")]),
# )
# def test_mutation_calls_plugin_perform_mutation_after_permission_checks(
#     mocked_plugin,
#     request,
#     settings,
#     staff_user,
#     plugin_configuration,
#     initiative,
#     channel_USD,
#     permission_manage_initiatives,
# ):
#     """
#     Ensure the mutation calls the method 'perform_mutation' on plugins only once the
#     user/app permissions are verified
#     """
#     mutation_query = """
#         mutation testRestrictedMutation($initiativeId: ID!) {
#             restrictedMutation(initiativeId: $initiativeId) {
#                 name
#                 errors {
#                     field
#                     message
#                 }
#             }
#         }
#     """
#
#     settings.PLUGINS = [
#         "pint.plugins.tests.sample_plugins.PluginSample",
#     ]
#
#     schema_context = request.getfixturevalue("schema_context")
#     schema_context.user = staff_user
#
#     initiative_id = graphene.Node.to_global_id("Initiative", initiative.pk)
#     variables = {"initiativeId": initiative_id}
#
#     # When permission is missing, it should not return the custom error from plugin
#     result = schema.execute(
#         mutation_query, variables=variables, context_value=schema_context
#     )
#     assert len(result.errors) == 1, result.to_dict()
#     assert "You need one of the following permissions" in result.errors[0].message
#
#     # When permission is not missing, the execution of the plugin should happen
#     staff_user.user_permissions.set([permission_manage_initiatives])
#     del staff_user._perm_cache  # force django to re-fetch permissions
#     result = schema.execute(
#         mutation_query, variables=variables, context_value=schema_context
#     )
#     assert len(result.errors) == 1, result.to_dict()
#     assert result.errors[0].message == "My Custom Error"


# def test_base_mutation_get_node_by_pk_with_initiative_qs_and_old_int_id(staff_user, initiative):
#     # given
#     initiative.use_old_id = True
#     initiative.save(update_fields=["use_old_id"])
#
#     info = mock.Mock(context=mock.Mock(user=staff_user))
#
#     # when
#     node = BaseMutation._get_node_by_pk(
#         info, initiative_types.Initiative, initiative.number, qs=Initiative.objects.all()
#     )
#
#     # then
#     assert node.id == initiative.id


def test_base_mutation_get_node_by_pk_with_initiative_qs_and_new_uuid_id(staff_user, initiative):
    # given
    info = mock.Mock(context=mock.Mock(user=staff_user))

    # when
    node = BaseMutation._get_node_by_pk(
        info, initiative_types.Initiative, initiative.pk, qs=Initiative.objects.all()
    )

    # then
    assert node.id == initiative.id


def test_base_mutation_get_node_by_pk_with_qs_for_initiative(staff_user, initiative):
    # given
    info = mock.Mock(context=mock.Mock(user=staff_user))

    # when
    node = BaseMutation._get_node_by_pk(
        info, initiative_types.Initiative, initiative.pk, qs=Initiative.objects.all()
    )

    # then
    assert node.id == initiative.id
