from typing import List, Optional

import graphene
from graphql import GraphQLError

from ...core.permissions import InitiativePermissions, has_one_of_permissions
from ...core.tracing import traced_resolver
from ...initiative.models import ALL_INITIATIVES_PERMISSIONS, PoliticalEntity
from ..core.connection import create_connection_slice, filter_connection_queryset
# from ..core.enums import ReportingPeriod
from ..core.fields import ConnectionField, FilterConnectionField, PermissionsField
# from ..core.types import NonNullList
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
from .bulk_mutations.initiatives import (
    InitiativeBulkDelete,
    InitiativeMediaBulkDelete,
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
    # resolve_categories,
    # resolve_category_by_id,
    # resolve_category_by_slug,
    # resolve_collection_by_id,
    # resolve_collection_by_slug,
    # resolve_collections,
    # resolve_digital_content_by_id,
    # resolve_digital_contents,
    resolve_initiative_by_id,
    resolve_initiative_by_slug,
    # resolve_Initiative_type_by_id,
    # resolve_Initiative_types,
    # resolve_Initiative_variant_by_sku,
    # resolve_Initiative_variants,
    resolve_initiatives,
    # resolve_report_Initiative_sales,
    # resolve_variant_by_id,
)
from .sorters import (
    # CategorySortingInput,
    # CollectionSortingInput,
    InitiativeOrder,
    InitiativeOrderField,
    InitiativeTypeSortingInput,
    InitiativeVariantSortingInput,
)
from .types import (
    Initiative,
    InitiativeCountableConnection,
    PoliticalEntityCountableConnection,
)


def search_string_in_kwargs(kwargs: dict) -> bool:
    return bool(kwargs.get("filter", {}).get("search", "").strip())


def sort_field_from_kwargs(kwargs: dict) -> Optional[List[str]]:
    return kwargs.get("sort_by", {}).get("field") or None


class InitiativeQueries(graphene.ObjectType):
    political_entities = ConnectionField(PoliticalEntityCountableConnection)
    initiative = graphene.Field(
        Initiative,
        id=graphene.Argument(
            graphene.ID,
            description="ID of the initiative.",
        ),
        slug=graphene.Argument(graphene.String, description="Slug of the initiative."),
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
        description=(
            "List of the shop's initiatives. Requires one of the following permissions to "
            "include the unpublished items: "
            f"{', '.join([p.name for p in ALL_INITIATIVES_PERMISSIONS])}."
        ),
    )

    @staticmethod
    def resolve_political_entities(self, info, **kwargs):
        qs = PoliticalEntity.objects.all()
        return create_connection_slice(qs, info, kwargs, PoliticalEntityCountableConnection)

    @staticmethod
    @traced_resolver
    def resolve_initiative(
        _root, info: graphene.ResolveInfo, *, id=None, slug=None, channel=None
    ):
        validate_one_of_args_is_in_query("id", id, "slug", slug)
        requestor = get_user_or_app_from_context(info.context)

        # has_required_permissions = has_one_of_permissions(
        #     requestor, ALL_INITIATIVES_PERMISSIONS
        # )

        # if channel is None and not has_required_permissions:
        #     channel = get_default_channel_slug_or_graphql_error()
        if id:
            _type, id = from_global_id_or_error(id, Initiative)
            initiative = resolve_initiative_by_id(
                info, id, requestor=requestor
            )
        else:
            initiative = resolve_initiative_by_slug(
                info, initiative_slug=slug, requestor=requestor
            )
        # return ChannelContext(node=initiative, channel_slug=channel) if initiative else None
        return initiative

    @staticmethod
    @traced_resolver
    def resolve_initiatives(_root, info: graphene.ResolveInfo, *, channel=None, **kwargs):
        if sort_field_from_kwargs(kwargs) == InitiativeOrderField.RANK:
            # sort by RANK can be used only with search filter
            if not search_string_in_kwargs(kwargs):
                raise GraphQLError(
                    "Sorting by RANK is available only when using a search filter."
                )
        if search_string_in_kwargs(kwargs) and not sort_field_from_kwargs(kwargs):
            # default to sorting by RANK if search is used
            # and no explicit sorting is requested
            initiative_type = info.schema.get_type("InitiativeOrder")
            kwargs["sort_by"] = initiative_type.create_container(
                {"direction": "-", "field": ["search_rank", "id"]}
            )

        requestor = get_user_or_app_from_context(info.context)
        # has_required_permissions = has_one_of_permissions(
        #     requestor, ALL_INITIATIVES_PERMISSIONS
        # )
        # if channel is None and not has_required_permissions:
        #     channel = get_default_channel_slug_or_graphql_error()
        qs = resolve_initiatives(info, requestor)
        # kwargs["channel"] = channel
        qs = filter_connection_queryset(qs, kwargs)
        return create_connection_slice(qs, info, kwargs, InitiativeCountableConnection)


class InitiativeMutations(graphene.ObjectType):

    initiative_create = InitiativeCreate.Field()
    initiative_delete = InitiativeDelete.Field()
    initiative_bulk_delete = InitiativeBulkDelete.Field()
    initiative_update = InitiativeUpdate.Field()
    initiative_translate = InitiativeTranslate.Field()

    initiative_media_create = InitiativeMediaCreate.Field()
    initiative_media_delete = InitiativeMediaDelete.Field()
    initiative_media_bulk_delete = InitiativeMediaBulkDelete.Field()
    initiative_media_reorder = InitiativeMediaReorder.Field()
    initiative_media_update = InitiativeMediaUpdate.Field()

