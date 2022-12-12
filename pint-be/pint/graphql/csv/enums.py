import graphene

from ...csv import ExportEvents, FileTypes
from ...graphql.core.enums import to_enum

ExportEventEnum = to_enum(ExportEvents)
FileTypeEnum = to_enum(FileTypes)


class ExportScope(graphene.Enum):
    ALL = "all"
    IDS = "ids"
    FILTER = "filter"

    @property
    def description(self):
        # pylint: disable=no-member
        description_mapping = {
            ExportScope.ALL.name: "Export all initiatives.",
            ExportScope.IDS.name: "Export initiatives with given ids.",
            ExportScope.FILTER.name: "Export the filtered initiatives.",
        }
        if self.name in description_mapping:
            return description_mapping[self.name]
        raise ValueError("Unsupported enum value: %s" % self.value)


class InitiativeFieldEnum(graphene.Enum):
    NAME = "name"
    DESCRIPTION = "description"
    INITIATIVE_TYPE = "initiative type"
    CATEGORY = "category"
    INITIATIVE_WEIGHT = "initiative weight"
    COLLECTIONS = "collections"
    CHARGE_TAXES = "charge taxes"
    INITIATIVE_MEDIA = "initiative media"
    VARIANT_ID = "variant id"
    VARIANT_SKU = "variant sku"
    VARIANT_WEIGHT = "variant weight"
    VARIANT_MEDIA = "variant media"
