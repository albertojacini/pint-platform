from enum import Enum


class InitiativeErrorCode(Enum):
    ALREADY_EXISTS = "already_exists"
    MEDIA_ALREADY_ASSIGNED = "media_already_assigned"
    DUPLICATED_INPUT_ITEM = "duplicated_input_item"
    GRAPHQL_ERROR = "graphql_error"
    INVALID = "invalid"
    NOT_INITIATIVES_IMAGE = "not_initiatives_image"
    NOT_FOUND = "not_found"
    REQUIRED = "required"
    UNIQUE = "unique"
    UNSUPPORTED_MEDIA_PROVIDER = "unsupported_media_provider"


class PoliticalEntityErrorCode(Enum):
    DUPLICATED_INPUT_ITEM = "duplicated_input_item"
    GRAPHQL_ERROR = "graphql_error"
    INVALID = "invalid"
    NOT_FOUND = "not_found"
    REQUIRED = "required"
    UNIQUE = "unique"
