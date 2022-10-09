from unittest.mock import MagicMock, patch

import graphene
# import pytest
# from django.core.files import File
# from django.utils import timezone
# from prices import Money, TaxedMoney
#
# from ....initiative.error_codes import InitiativeErrorCode
from ....initiative.models import (
    Initiative,
    InitiativeMedia,
)
# from ....tests.utils import flush_post_commit_hooks
# from ....thumbnail.models import Thumbnail
from ...tests.utils import get_graphql_content




DELETE_INITIATIVES_MUTATION = """
mutation initiativeBulkDelete($ids: [ID!]!) {
    initiativeBulkDelete(ids: $ids) {
        count
        errors {
            code
            field
        }
    }
}
"""


def test_delete_initiatives(
    staff_api_client,
    initiative_list,
    permission_manage_initiatives,
):
    # given
    query = DELETE_INITIATIVES_MUTATION

    variables = {
        "ids": [
            graphene.Node.to_global_id("Initiative", initiative.id)
            for initiative in initiative_list
        ]
    }

    # when
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_initiatives]
    )

    # then
    content = get_graphql_content(response)

    assert content["data"]["initiativeBulkDelete"]["count"] == 3
    assert not Initiative.objects.filter(
        id__in=[initiative.id for initiative in initiative_list]
    ).exists()


@patch("pint.initiative.signals.delete_from_storage_task.delay")
@patch("pint.order.tasks.recalculate_orders_task.delay")
def test_delete_initiatives_with_images(
    mocked_recalculate_orders_task,
    delete_from_storage_task_mock,
    staff_api_client,
    initiative_list,
    image_list,
    permission_manage_initiatives,
    channel_USD,
    media_root,
):
    # given
    media1 = InitiativeMedia.objects.create(initiative=initiative_list[0], image=image_list[0])
    media2 = InitiativeMedia.objects.create(initiative=initiative_list[1], image=image_list[1])

    query = DELETE_INITIATIVES_MUTATION
    variables = {
        "ids": [
            graphene.Node.to_global_id("Initiative", initiative.id)
            for initiative in initiative_list
        ]
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_initiatives]
    )
    content = get_graphql_content(response)

    assert content["data"]["initiativeBulkDelete"]["count"] == 3
    assert delete_from_storage_task_mock.call_count == 2
    assert {
        call_args.args[0] for call_args in delete_from_storage_task_mock.call_args_list
    } == {media1.image.name, media2.image.name}
    mocked_recalculate_orders_task.assert_not_called()


@patch("pint.plugins.webhook.plugin.get_webhooks_for_event")
@patch("pint.plugins.webhook.plugin.trigger_webhooks_async")
@patch("pint.order.tasks.recalculate_orders_task.delay")
def test_delete_initiatives_trigger_webhook(
    mocked_recalculate_orders_task,
    mocked_webhook_trigger,
    mocked_get_webhooks_for_event,
    any_webhook,
    staff_api_client,
    initiative_list,
    permission_manage_initiatives,
    channel_USD,
    settings,
):
    # given
    mocked_get_webhooks_for_event.return_value = [any_webhook]
    settings.PLUGINS = ["pint.plugins.webhook.plugin.WebhookPlugin"]

    query = DELETE_INITIATIVES_MUTATION
    variables = {
        "ids": [
            graphene.Node.to_global_id("Initiative", initiative.id)
            for initiative in initiative_list
        ]
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_initiatives]
    )
    content = get_graphql_content(response)

    assert content["data"]["initiativeBulkDelete"]["count"] == 3
    assert mocked_webhook_trigger.called
    mocked_recalculate_orders_task.assert_not_called()
