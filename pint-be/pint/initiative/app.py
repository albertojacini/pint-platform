from django.apps import AppConfig
from django.db.models.signals import post_delete


class InitiativeAppConfig(AppConfig):
    name = "pint.initiative"

    def ready(self):
        pass
