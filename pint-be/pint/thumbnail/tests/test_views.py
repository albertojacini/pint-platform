import graphene

from .. import ThumbnailFormat
from ..models import Thumbnail


# def test_handle_thumbnail_view_with_format(client, category_with_image, settings):
#     # given
#     size = 60
#     format = ThumbnailFormat.WEBP
#     category_id = graphene.Node.to_global_id("Category", category_with_image.id)
#     thumbnail_count = Thumbnail.objects.count()
#
#     # when
#     response = client.get(f"/thumbnail/{category_id}/{size}/{format}/")
#
#     # then
#     assert response.status_code == 302
#     file_path, _ = category_with_image.background_image.name.rsplit(".")
#     assert (
#         response.url
#         == settings.MEDIA_URL + f"thumbnails/{file_path}_thumbnail_64.{format.lower()}"
#     )
#     assert Thumbnail.objects.count() == thumbnail_count + 1
#
#
# def test_handle_thumbnail_view_for_category(client, category_with_image, settings):
#     # given
#     size = 60
#     category_id = graphene.Node.to_global_id("Category", category_with_image.id)
#     thumbnail_count = 0
#
#     # when
#     response = client.get(f"/thumbnail/{category_id}/{size}/")
#
#     # then
#     assert response.status_code == 302
#     file_path, ext = category_with_image.background_image.name.rsplit(".")
#     assert (
#         response.url
#         == settings.MEDIA_URL + f"thumbnails/{file_path}_thumbnail_64.{ext}"
#     )
#     assert Thumbnail.objects.count() == thumbnail_count + 1
#
#
# def test_handle_thumbnail_view_for_collection(client, collection_with_image, settings):
#     # given
#     size = 100
#     collection_id = graphene.Node.to_global_id("Collection", collection_with_image.id)
#     thumbnail_count = Thumbnail.objects.count()
#
#     # when
#     response = client.get(f"/thumbnail/{collection_id}/{size}/")
#
#     # then
#     assert response.status_code == 302
#     file_path, ext = collection_with_image.background_image.name.rsplit(".")
#     assert (
#         response.url
#         == settings.MEDIA_URL + f"thumbnails/{file_path}_thumbnail_128.{ext}"
#     )
#     assert Thumbnail.objects.count() == thumbnail_count + 1
#
#
# def test_handle_thumbnail_view_for_user(
#     client, staff_user, image, media_root, settings
# ):
#     # given
#     staff_user.avatar = image
#     staff_user.save(update_fields=["avatar"])
#
#     size = 200
#     user_uuid = graphene.Node.to_global_id("User", staff_user.uuid)
#     thumbnail_count = Thumbnail.objects.count()
#
#     # when
#     response = client.get(f"/thumbnail/{user_uuid}/{size}/")
#
#     # then
#     assert response.status_code == 302
#     file_path, ext = staff_user.avatar.name.rsplit(".")
#     assert (
#         response.url
#         == settings.MEDIA_URL + f"thumbnails/{file_path}_thumbnail_256.{ext}"
#     )
#     assert Thumbnail.objects.count() == thumbnail_count + 1


def test_handle_thumbnail_view_for_initiative_media(
    client, staff_user, initiative_with_image, settings
):
    # given
    initiative_media = initiative_with_image.media.first()

    size = 500
    initiative_media_id = graphene.Node.to_global_id("InitiativeMedia", initiative_media.id)
    thumbnail_count = Thumbnail.objects.count()

    # when
    response = client.get(f"/thumbnail/{initiative_media_id}/{size}/")

    # then
    assert response.status_code == 302
    file_path, ext = initiative_media.image.name.rsplit(".")
    assert (
        response.url
        == settings.MEDIA_URL + f"thumbnails/{file_path}_thumbnail_512.{ext}"
    )
    assert Thumbnail.objects.count() == thumbnail_count + 1


# def test_handle_thumbnail_view_for_category_thumbnail_already_exist(
#     client, category, settings, image, media_root
# ):
#     # given
#     size = 64
#     thumbnail = Thumbnail.objects.create(category=category, size=size, image=image)
#     category_id = graphene.Node.to_global_id("Category", category.id)
#     thumbnail_count = Thumbnail.objects.count()
#
#     # when
#     response = client.get(f"/thumbnail/{category_id}/{size}/")
#
#     # then
#     assert response.status_code == 302
#     assert response.url == thumbnail.image.url
#     assert Thumbnail.objects.count() == thumbnail_count
#
#
# def test_handle_thumbnail_view_for_collection_thumbnail_already_exist(
#     client, collection, settings, image, media_root
# ):
#     # given
#     size = 128
#     thumbnail = Thumbnail.objects.create(collection=collection, size=128, image=image)
#     collection_id = graphene.Node.to_global_id("Collection", collection.id)
#     thumbnail_count = Thumbnail.objects.count()
#
#     # when
#     response = client.get(f"/thumbnail/{collection_id}/{size}/")
#
#     # then
#     assert response.status_code == 302
#     assert response.url == thumbnail.image.url
#     assert Thumbnail.objects.count() == thumbnail_count
#
#
# def test_handle_thumbnail_view_for_user_thumbnail_already_exist(
#     client, staff_user, settings, image, media_root
# ):
#     # given
#     size = 128
#     thumbnail = Thumbnail.objects.create(user=staff_user, size=128, image=image)
#     user_uuid = graphene.Node.to_global_id("User", staff_user.uuid)
#     thumbnail_count = Thumbnail.objects.count()
#
#     # when
#     response = client.get(f"/thumbnail/{user_uuid}/{size}/")
#
#     # then
#     assert response.status_code == 302
#     assert response.url == thumbnail.image.url
#     assert Thumbnail.objects.count() == thumbnail_count


def test_handle_thumbnail_view_for_initiative_media_thumbnail_already_exist(
    client, initiative_with_image, settings, image, media_root
):
    # given
    initiative_media = initiative_with_image.media.first()
    size = 256
    thumbnail = Thumbnail.objects.create(
        initiative_media=initiative_media, size=256, image=image
    )
    initiative_media_id = graphene.Node.to_global_id("InitiativeMedia", initiative_media.id)
    thumbnail_count = Thumbnail.objects.count()

    # when
    response = client.get(f"/thumbnail/{initiative_media_id}/{size}/")

    # then
    assert response.status_code == 302
    assert response.url == thumbnail.image.url
    assert Thumbnail.objects.count() == thumbnail_count


def test_handle_thumbnail_view_no_image(client, initiative):
    # given
    size = 60
    initiative_id = graphene.Node.to_global_id("Initiative", initiative.id)

    # when
    response = client.get(f"/thumbnail/{initiative_id}/{size}/")

    # then
    assert response.status_code == 404


def test_handle_thumbnail_view_invalid_object_type(client, initiative):
    # given
    size = 60
    initiative_id = graphene.Node.to_global_id("Order", initiative.id)

    # when
    response = client.get(f"/thumbnail/{initiative_id}/{size}/")

    # then
    assert response.status_code == 404


def test_handle_thumbnail_view_invalid_format(client, initiative):
    # given
    size = 60
    category_id = graphene.Node.to_global_id("Order", initiative.id)

    # when
    response = client.get(f"/thumbnail/{category_id}/{size}/XYZ/")

    # then
    assert response.status_code == 404


def test_handle_thumbnail_view_invalid_instance_id(client, initiative):
    # given
    size = 60
    initiative_id = initiative.id

    # when
    response = client.get(f"/thumbnail/{initiative_id}/{size}/")

    # then
    assert response.status_code == 404


def test_handle_thumbnail_view_object_does_not_exists(client):
    # given
    size = 60
    category_id = graphene.Node.to_global_id("Category", 1)

    # when
    response = client.get(f"/thumbnail/{category_id}/{size}/")

    # then
    assert response.status_code == 404
