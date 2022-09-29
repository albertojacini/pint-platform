import pytest
from unittest.mock import patch


@pytest.mark.django_db
@patch("pint.initiative.signals.delete_from_storage_task.delay")
def test_initiative_media_delete(delete_from_storage_task_mock, initiative_with_image):
    # given
    media = initiative_with_image.media.first()

    # when
    media.delete()

    # then
    delete_from_storage_task_mock.assert_called_once_with(media.image.name)
