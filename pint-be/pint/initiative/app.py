from django.apps import AppConfig
from django.db.models.signals import post_delete


class InitiativeAppConfig(AppConfig):
    name = "pint.initiative"

    def ready(self):
        from .models import InitiativeMedia
        # from .models import Category, Collection, DigitalContent, InitiativeMedia
        from .signals import (
            delete_background_image,
            delete_digital_content_file,
            delete_initiative_media_image,
        )

        # preventing duplicate signals
        # post_delete.connect(
        #     delete_background_image,
        #     sender=Category,
        #     dispatch_uid="delete_category_background",
        # )
        # post_delete.connect(
        #     delete_background_image,
        #     sender=Collection,
        #     dispatch_uid="delete_collection_background",
        # )
        post_delete.connect(
            delete_initiative_media_image,
            sender=InitiativeMedia,
            dispatch_uid="delete_initiative_media_image",
        )
        # post_delete.connect(
        #     delete_digital_content_file,
        #     sender=DigitalContent,
        #     dispatch_uid="delete_digital_content_file",
        # )
