from unittest.mock import Mock

import graphene

from .....app.models import AppInstallation
from .....core import JobStatus
from ....core.enums import AppErrorCode, PermissionEnum
from ....tests.utils import assert_no_permission, get_graphql_content

INSTALL_APP_MUTATION = """
    mutation AppInstall(
        $app_name: String, $manifest_url: String, $permissions: [PermissionEnum!]){
        appInstall(
            input:{appName: $app_name, manifestUrl: $manifest_url,
                permissions:$permissions}){
            appInstallation{
                id
                status
                appName
                manifestUrl
            }
            errors{
                field
                message
                code
                permissions
            }
        }
    }
"""


def test_install_app_mutation(
    db,
    permission_manage_apps,
    permission_manage_initiatives,
    staff_api_client,
    staff_user,
    monkeypatch,
):
    mocked_task = Mock()
    monkeypatch.setattr(
        "pint.graphql.app.mutations.install_app_task.delay", mocked_task
    )
    query = INSTALL_APP_MUTATION
    staff_user.user_permissions.set([permission_manage_apps, permission_manage_initiatives])
    variables = {
        "app_name": "New external integration",
        "manifest_url": "http://localhost:3000/manifest",
        "permissions": [PermissionEnum.MANAGE_INITIATIVES.name],
    }
    response = staff_api_client.post_graphql(
        query,
        variables=variables,
    )
    content = get_graphql_content(response)
    app_installation = AppInstallation.objects.get()
    app_installation_data = content["data"]["appInstall"]["appInstallation"]
    _, app_id = graphene.Node.from_global_id(app_installation_data["id"])
    assert int(app_id) == app_installation.id
    assert app_installation_data["status"] == JobStatus.PENDING.upper()
    assert app_installation_data["manifestUrl"] == app_installation.manifest_url
    mocked_task.assert_called_with(app_installation.pk, True)


def test_app_is_not_allowed_to_install_app(
    db, permission_manage_apps, permission_manage_initiatives, app_api_client, monkeypatch
):
    # given
    query = INSTALL_APP_MUTATION
    app_api_client.app.permissions.set(
        [permission_manage_apps, permission_manage_initiatives]
    )
    variables = {
        "app_name": "New external integration",
        "manifest_url": "http://localhost:3000/manifest",
        "permissions": [PermissionEnum.MANAGE_INITIATIVES.name],
    }

    # when
    response = app_api_client.post_graphql(
        query,
        variables=variables,
    )

    # then
    assert_no_permission(response)


def test_app_install_mutation_out_of_scope_permissions(
    db, permission_manage_apps, staff_api_client, staff_user
):
    query = INSTALL_APP_MUTATION
    staff_user.user_permissions.set([permission_manage_apps])
    variables = {
        "app_name": "New external integration",
        "manifest_url": "http://localhost:3000/manifest",
        "permissions": [PermissionEnum.MANAGE_INITIATIVES.name],
    }
    response = staff_api_client.post_graphql(
        query,
        variables=variables,
    )
    content = get_graphql_content(response)
    data = content["data"]["appInstall"]

    errors = data["errors"]
    assert not data["appInstallation"]
    assert len(errors) == 1
    error = errors[0]
    assert error["field"] == "permissions"
    assert error["code"] == AppErrorCode.OUT_OF_SCOPE_PERMISSION.name
    assert error["permissions"] == [PermissionEnum.MANAGE_INITIATIVES.name]
