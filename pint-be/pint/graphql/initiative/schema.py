from typing import List, Optional

import graphene
from graphql import GraphQLError

from ...core.permissions import InitiativePermissions, has_one_of_permissions
from ...core.tracing import traced_resolver
from ...initiative.models import ALL_INITIATIVES_PERMISSIONS
from ..core.connection import create_connection_slice, filter_connection_queryset
from ..core.enums import ReportingPeriod
from ..core.fields import ConnectionField, FilterConnectionField, PermissionsField
from ..core.types import NonNullList
from ..core.utils import from_global_id_or_error
from ..core.validators import validate_one_of_args_is_in_query
from ..translations.mutations import (
    # CategoryTranslate,
    # CollectionTranslate,
    InitiativeTranslate,
    # InitiativeVariantTranslate,
)
from ..utils import get_user_or_app_from_context
from .filters import (
    InitiativeFilterInput,
)
from .mutations.initiatives import (
    InitiativeCreate,
    InitiativeDelete,
    InitiativeMediaCreate,
    InitiativeMediaDelete,
    InitiativeMediaReorder,
    InitiativeMediaUpdate,
    InitiativeUpdate,
)
from .resolvers import (
    resolve_categories,
    resolve_category_by_id,
    resolve_category_by_slug,
    resolve_collection_by_id,
    resolve_collection_by_slug,
    resolve_collections,
    resolve_digital_content_by_id,
    resolve_digital_contents,
    resolve_initiative_by_id,
    resolve_initiative_by_slug,
    resolve_Initiative_type_by_id,
    resolve_Initiative_types,
    resolve_Initiative_variant_by_sku,
    resolve_Initiative_variants,
    resolve_initiatives,
    resolve_report_Initiative_sales,
    resolve_variant_by_id,
)
from .sorters import (
    CategorySortingInput,
    CollectionSortingInput,
    InitiativeOrder,
    InitiativeOrderField,
    InitiativeTypeSortingInput,
    InitiativeVariantSortingInput,
)
from .types import (
    Initiative,
    InitiativeCountableConnection,
)


def search_string_in_kwargs(kwargs: dict) -> bool:
    return bool(kwargs.get("filter", {}).get("search", "").strip())


def sort_field_from_kwargs(kwargs: dict) -> Optional[List[str]]:
    return kwargs.get("sort_by", {}).get("field") or None


class InitiativeQueries(graphene.ObjectType):


    initiative = graphene.Field(
        Initiative,
        id=graphene.Argument(
            graphene.ID,
            description="ID of the initiative.",
        ),
        slug=graphene.Argument(graphene.String, description="Slug of the initiative."),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description=(
            "Look up a initiative by ID. Requires one of the following permissions to "
            "include the unpublished items: "
            f"{', '.join([p.name for p in ALL_INITIATIVES_PERMISSIONS])}."
        ),
    )
    initiatives = FilterConnectionField(
        InitiativeCountableConnection,
        filter=InitiativeFilterInput(description="Filtering options for initiatives."),
        sort_by=InitiativeOrder(description="Sort initiatives."),
        channel=graphene.String(
            description="Slug of a channel for which the data should be returned."
        ),
        description=(
            "List of the shop's initiatives. Requires one of the following permissions to "
            "include the unpublished items: "
            f"{', '.join([p.name for p in ALL_INITIATIVES_PERMISSIONS])}."
        ),
    )



class InitiativeMutations(graphene.ObjectType):

    Initiative_create = InitiativeCreate.Field()
    Initiative_delete = InitiativeDelete.Field()
    Initiative_bulk_delete = InitiativeBulkDelete.Field()
    Initiative_update = InitiativeUpdate.Field()
    Initiative_translate = InitiativeTranslate.Field()

    Initiative_media_create = InitiativeMediaCreate.Field()
    Initiative_media_delete = InitiativeMediaDelete.Field()
    Initiative_media_bulk_delete = InitiativeMediaBulkDelete.Field()
    Initiative_media_reorder = InitiativeMediaReorder.Field()
    Initiative_media_update = InitiativeMediaUpdate.Field()

