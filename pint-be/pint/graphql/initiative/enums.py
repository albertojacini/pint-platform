import graphene

from ...initiative import InitiativeMediaTypes
from ..core.enums import to_enum

# InitiativeTypeKindEnum = to_enum(InitiativeTypeKind)
InitiativeMediaType = to_enum(InitiativeMediaTypes, type_name="InitiativeMediaType")


class InitiativeAttributeType(graphene.Enum):
    PRODUCT = "PRODUCT"
    VARIANT = "VARIANT"


class StockAvailability(graphene.Enum):
    IN_STOCK = "AVAILABLE"
    OUT_OF_STOCK = "OUT_OF_STOCK"


class CollectionPublished(graphene.Enum):
    PUBLISHED = "published"
    HIDDEN = "hidden"


class InitiativeTypeConfigurable(graphene.Enum):
    CONFIGURABLE = "configurable"
    SIMPLE = "simple"


class InitiativeTypeEnum(graphene.Enum):
    DIGITAL = "digital"
    SHIPPABLE = "shippable"


class VariantAttributeScope(graphene.Enum):
    ALL = "all"
    VARIANT_SELECTION = "variant_selection"
    NOT_VARIANT_SELECTION = "not_variant_selection"
