import json
from unittest.mock import Mock, patch

import graphene
import pytest
import requests
from django.core.exceptions import ValidationError
from freezegun import freeze_time

from ...core.utils.json_serializer import CustomJsonEncoder
from ...webhook.event_types import WebhookEventAsyncType
from ...webhook.payloads import generate_meta, generate_requestor
from ..installation_utils import install_app
from ..models import App
from ..types import AppExtensionMount, AppExtensionTarget


def test_install_app_created_app(
    db, app_manifest, app_installation, monkeypatch, permission_manage_initiatives
):
    # given
    app_manifest["permissions"] = ["MANAGE_INITIATIVES"]
    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest

    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    app_installation.permissions.set([permission_manage_initiatives])

    # when
    app, _ = install_app(app_installation, activate=True)

    # then
    assert App.objects.get().id == app.id
    assert list(app.permissions.all()) == [permission_manage_initiatives]


# @freeze_time("2022-05-12 12:00:00")
# @patch("pint.plugins.webhook.plugin.get_webhooks_for_event")
# @patch("pint.plugins.webhook.plugin.trigger_webhooks_async")
# def test_install_app_created_app_trigger_webhook(
#     mocked_webhook_trigger,
#     mocked_get_webhooks_for_event,
#     any_webhook,
#     app_manifest,
#     app_installation,
#     monkeypatch,
#     permission_manage_products,
#     settings,
# ):
#     # given
#     mocked_get_webhooks_for_event.return_value = [any_webhook]
#     settings.PLUGINS = ["pint.plugins.webhook.plugin.WebhookPlugin"]
#
#     app_manifest["permissions"] = ["MANAGE_PRODUCTS"]
#     mocked_get_response = Mock()
#     mocked_get_response.json.return_value = app_manifest
#
#     monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
#     monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())
#
#     app_installation.permissions.set([permission_manage_products])
#
#     # when
#     app, _ = install_app(app_installation, activate=True)
#
#     # then
#     mocked_webhook_trigger.assert_called_once_with(
#         json.dumps(
#             {
#                 "id": graphene.Node.to_global_id("App", app.id),
#                 "is_active": app.is_active,
#                 "name": app.name,
#                 "meta": generate_meta(requestor_data=generate_requestor()),
#             },
#             cls=CustomJsonEncoder,
#         ),
#         WebhookEventAsyncType.APP_INSTALLED,
#         [any_webhook],
#         app,
#         None,
#     )


def test_install_app_with_extension(
    db,
    app_manifest,
    app_installation,
    monkeypatch,
    permission_manage_initiatives,
    # permission_manage_orders,
):
    # given
    label = "Create product with app"
    url = "http://127.0.0.1:8080/app-extension"
    app_manifest["permissions"] = ["MANAGE_INITIATIVES"]
    # app_manifest["permissions"] = ["MANAGE_INITIATIVES", "MANAGE_ORDERS"]
    app_manifest["extensions"] = [
        {
            "label": label,
            "url": url,
            "mount": "INITIATIVE_OVERVIEW_CREATE",
            "permissions": ["MANAGE_INITIATIVES"],
        }
    ]
    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest

    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    app_installation.permissions.set(
        [permission_manage_initiatives]
        # [permission_manage_initiatives, permission_manage_orders]
    )

    # when
    app, _ = install_app(app_installation, activate=True)

    # then
    assert App.objects.get().id == app.id
    app_extension = app.extensions.get()

    assert app_extension.label == label
    assert app_extension.url == url
    assert app_extension.mount == AppExtensionMount.INITIATIVE_OVERVIEW_CREATE
    assert app_extension.target == AppExtensionTarget.POPUP
    assert list(app_extension.permissions.all()) == [permission_manage_initiatives]


@pytest.mark.parametrize(
    "app_permissions, extension_permissions",
    [
        ([], ["MANAGE_INITIATIVES"]),
        (["MANAGE_INITIATIVES"], ["MANAGE_INITIATIVES", "MANAGE_APPS"]),
    ],
)
def test_install_app_extension_permission_out_of_scope(
    db, app_permissions, extension_permissions, app_manifest, app_installation, monkeypatch
):
    # given
    label = "Create product with app"
    url = "http://127.0.0.1:8080/app-extension"
    view = "INITIATIVE"
    type = "OVERVIEW"
    target = "CREATE"
    app_manifest["permissions"] = app_permissions
    app_manifest["extensions"] = [
        {
            "label": label,
            "url": url,
            "view": view,
            "type": type,
            "target": target,
            "permissions": extension_permissions,
        }
    ]
    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest

    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    # when & then
    with pytest.raises(ValidationError):
        install_app(app_installation, activate=True)


@pytest.mark.parametrize(
    "url",
    [
        "http:/127.0.0.1:8080/app",
        "127.0.0.1:8080/app",
        "",
        "/app",
        "www.example.com/app",
    ],
)
def test_install_app_extension_incorrect_url(
    db, url, app_manifest, app_installation, monkeypatch
):
    # given
    app_manifest["permissions"] = ["MANAGE_INITIATIVES"]
    app_manifest["extensions"] = [
        {
            "url": url,
            "label": "Create product with app",
            "view": "INITIATIVE",
            "type": "OVERVIEW",
            "target": "CREATE",
            "permissions": ["MANAGE_INITIATIVES"],
        }
    ]
    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest

    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    # when & then
    with pytest.raises(ValidationError):
        install_app(app_installation, activate=True)


def test_install_app_extension_ivalid_permission(
    db, app_manifest, app_installation, monkeypatch
):
    # given
    label = "Create product with app"
    url = "http://127.0.0.1:8080/app-extension"
    view = "INITIATIVE"
    type = "OVERVIEW"
    target = "CREATE"
    app_manifest["permissions"] = ["MANAGE_INITIATIVES"]
    app_manifest["extensions"] = [
        {
            "label": label,
            "url": url,
            "view": view,
            "type": type,
            "target": target,
            "permissions": ["INVALID_PERM"],
        }
    ]
    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest

    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    # when & then
    with pytest.raises(ValidationError):
        install_app(app_installation, activate=True)


@pytest.mark.parametrize(
    "incorrect_field",
    [
        "view",
        "type",
        "target",
    ],
)
def test_install_app_extension_incorrect_values(
    db, incorrect_field, app_manifest, app_installation, monkeypatch
):
    # given
    label = "Create product with app"
    url = "http://127.0.0.1:8080/app-extension"
    view = "INITIATIVE"
    type = "OVERVIEW"
    target = "CREATE"
    app_manifest["permissions"] = []
    app_manifest["extensions"] = [
        {
            "label": label,
            "url": url,
            "view": view,
            "type": type,
            "target": target,
            "permissions": ["MANAGE_INITIATIVES"],
        }
    ]
    app_manifest["extensions"][0][incorrect_field] = "wrong-value"
    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest

    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    # when & then
    with pytest.raises(ValidationError):
        install_app(app_installation, activate=True)


def test_install_app_with_webhook(
    db, app_manifest, app_manifest_webhook, app_installation, monkeypatch
):
    # given
    app_manifest["webhooks"] = [app_manifest_webhook]

    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest
    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))
    monkeypatch.setattr("pint.app.installation_utils.send_app_token", Mock())

    # when
    app, _ = install_app(app_installation, activate=True)

    # then
    assert app.id == App.objects.get().id

    webhook = app.webhooks.get()
    assert webhook.name == app_manifest_webhook["name"]
    assert sorted(webhook.events.values_list("event_type", flat=True)) == sorted(
        app_manifest_webhook["events"]
    )
    assert webhook.subscription_query == app_manifest_webhook["query"]
    assert webhook.target_url == app_manifest_webhook["targetUrl"]
    assert webhook.is_active is True


def test_install_app_webhook_incorrect_url(
    db, app_manifest, app_manifest_webhook, app_installation, monkeypatch
):
    # given
    app_manifest_webhook["targetUrl"] = "ftp://user:pass@app.example/deep/cover"
    app_manifest["webhooks"] = [app_manifest_webhook]

    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest
    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))

    # when & then
    with pytest.raises(ValidationError) as excinfo:
        install_app(app_installation, activate=True)

    error_dict = excinfo.value.error_dict
    assert "webhooks" in error_dict
    assert error_dict["webhooks"][0].message == "Invalid target url."


def test_install_app_webhook_incorrect_query(
    db, app_manifest, app_manifest_webhook, app_installation, monkeypatch
):
    # given
    app_manifest_webhook[
        "query"
    ] = """
        no {
            that's {
                not {
                    ... on a {
                        valid graphql {
                            query
                        }
                    }
                }
            }
        }
    """
    app_manifest["webhooks"] = [app_manifest_webhook]

    mocked_get_response = Mock()
    mocked_get_response.json.return_value = app_manifest
    monkeypatch.setattr(requests, "get", Mock(return_value=mocked_get_response))

    # when & then
    with pytest.raises(ValidationError) as excinfo:
        install_app(app_installation, activate=True)

    error_dict = excinfo.value.error_dict
    assert "webhooks" in error_dict
    assert error_dict["webhooks"][0].message == "Subscription query is not valid."
