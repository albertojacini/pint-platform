# import datetime
# from typing import TYPE_CHECKING, Iterable, Optional, Union
# from uuid import uuid4
#
# import graphene
# import pytz
# from django.conf import settings
# from django.contrib.postgres.aggregates import StringAgg
# from django.contrib.postgres.indexes import BTreeIndex, GinIndex
# from django.contrib.postgres.search import SearchVectorField
# from django.core.validators import MinValueValidator
from django.db import models, transaction
from django.db.models import JSONField  # type: ignore
# from django.db.models import (
#     BooleanField,
#     Case,
#     Count,
#     DateTimeField,
#     Exists,
#     ExpressionWrapper,
#     F,
#     FilteredRelation,
#     OuterRef,
#     Q,
#     Subquery,
#     Sum,
#     TextField,
#     Value,
#     When,
# )
# from django.db.models.functions import Coalesce
# from django.urls import reverse
# from django.utils import timezone
# from django.utils.encoding import smart_text
# from django_measurement.models import MeasurementField
# from django_prices.models import MoneyField
# from measurement.measures import Weight
# from mptt.managers import TreeManager
# from mptt.models import MPTTModel
# from prices import Money
#
# from ..core.db.fields import SanitizedJSONField
from ..core.models import ModelWithMetadata, PublishableModel, SortableModel
# from ..core.permissions import (
#     DiscountPermissions,
#     OrderPermissions,
#     ProductPermissions,
#     ProductTypePermissions,
#     has_one_of_permissions,
# )
# from ..core.utils import build_absolute_uri
# from ..core.utils.draftjs import json_content_to_raw_text
# from ..core.utils.editorjs import clean_editor_js
from ..core.utils.translations import Translation, TranslationProxy
from ..seo.models import SeoModel, SeoModelTranslation
# from . import ProductMediaTypes, ProductTypeKind

# if TYPE_CHECKING:
#     # flake8: noqa
#     from decimal import Decimal
#
#     from django.db.models import OrderBy
#
#     from ..account.models import User
#     from ..app.models import App

# ALL_PRODUCTS_PERMISSIONS = [
#     # List of permissions, where each of them allows viewing all products
#     # (including unpublished).
#     OrderPermissions.MANAGE_ORDERS,
#     DiscountPermissions.MANAGE_DISCOUNTS,
#     ProductPermissions.MANAGE_PRODUCTS,
# ]


class Initiative(SeoModel, ModelWithMetadata):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    # description = SanitizedJSONField(blank=True, null=True, sanitizer=clean_editor_js)
    # description_plaintext = TextField(blank=True)
    # search_document = models.TextField(blank=True, default="")
    # search_vector = SearchVectorField(blank=True, null=True)
    # search_index_dirty = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)
    translated = TranslationProxy()

    class Meta:
        app_label = "initiative"
        ordering = ("slug",)
        # permissions = (
        #     (ProductPermissions.MANAGE_PRODUCTS.codename, "Manage products."),
        # )
        # indexes = [
        #     GinIndex(
        #         name="product_search_gin",
        #         fields=["search_document"],
        #         opclasses=["gin_trgm_ops"],
        #     ),
        #     GinIndex(
        #         name="product_tsearch",
        #         fields=["search_vector"],
        #     ),
        # ]
        # indexes.extend(ModelWithMetadata.Meta.indexes)

    def __str__(self) -> str:
        return self.title
