from unittest.mock import ANY, Mock

import pytest
import requests
from django.core.management import call_command

from ...core import JobStatus
from ...core.permissions import get_permissions
from ..models import App, AppInstallation


@pytest.mark.vcr
def test_creates_app_from_manifest(db):
    manifest_url = "http://otherapp:3000/manifest"
    call_command("install_app", manifest_url)

    app = App.objects.get()

    tokens = app.tokens.all()
    assert len(tokens) == 1
    assert not app.is_active


@pytest.mark.vcr
def test_creates_app_from_manifest_activate_app(db):
    manifest_url = "http://otherapp:3000/manifest"
    call_command("install_app", manifest_url, activate=True)

    app = App.objects.get()

    tokens = app.tokens.all()
    assert len(tokens) == 1
    assert app.is_active


@pytest.mark.vcr
def test_creates_app_from_manifest_app_has_all_required_permissions(db):
    manifest_url = "http://localhost:3000/manifest"
    permission_list = ["account.manage_users"]
    expected_permission = get_permissions(permission_list)
    call_command("install_app", manifest_url)

    app = App.objects.get()
    assert set(app.permissions.all()) == set(expected_permission)


@pytest.mark.vcr
def test_creates_app_from_manifest_sends_token(db, monkeypatch):
    mocked_response = Mock()
    mocked_response.status_code = 200
    mocked_post = Mock(return_value=mocked_response)

    monkeypatch.setattr(requests, "post", mocked_post)
    manifest_url = "http://localhost:3000/manifest"

    call_command("install_app", manifest_url)

    mocked_post.assert_called_once_with(
        "http://localhost:3000/register",
        headers={
            "Content-Type": "application/json",
            # X- headers will be deprecated in Saleor 4.0, proper headers are without X-
            "x-pint-domain": "example.com",
            "pint-domain": "example.com",
        },
        json={"auth_token": ANY},
        timeout=ANY,
    )


@pytest.mark.vcr
def test_creates_app_from_manifest_installation_failed(db):
    manifest_url = "http://localhost:3000/manifest-wrong"

    with pytest.raises(Exception):
        call_command("install_app", manifest_url)

    app_job = AppInstallation.objects.get()
    assert app_job.status == JobStatus.FAILED


def test_creates_app_object(db):
    name = "Single App"
    permissions = ["MANAGE_USERS"]
    call_command("create_app", name, permission=permissions)

    apps = App.objects.filter(name=name)
    assert len(apps) == 1

    app = apps[0]
    tokens = app.tokens.all()
    assert len(tokens) == 1


def test_app_has_all_required_permissions(db):
    name = "SA name"
    expected_permission = get_permissions(
        ["account.manage_users", "order.manage_initiatives"]
    )
    call_command("create_app", name, permission=["MANAGE_USERS", "MANAGE_INITIATIVES"])

    apps = App.objects.filter(name=name)
    assert len(apps) == 1
    app = apps[0]
    assert set(app.permissions.all()) == set(expected_permission)


def test_sends_data_to_target_url(db, monkeypatch):
    mocked_response = Mock()
    mocked_response.status_code = 200
    mocked_post = Mock(return_value=mocked_response)

    monkeypatch.setattr(requests, "post", mocked_post)

    name = "Single App"
    target_url = "https://ss.shop.com/register"
    permissions = ["MANAGE_USERS"]

    call_command("create_app", name, permission=permissions, target_url=target_url)

    mocked_post.assert_called_once_with(
        target_url,
        headers={
            # X- headers will be deprecated in Saleor 4.0, proper headers are without X-
            "x-pint-domain": "example.com",
            "pint-domain": "example.com",
        },
        json={"auth_token": ANY},
        timeout=ANY,
    )
