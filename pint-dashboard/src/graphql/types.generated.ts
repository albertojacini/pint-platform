/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  JSONString: any;
  /**
   * Metadata is a map of key-value pairs, both keys and values are `String`.
   *
   * Example:
   * ```
   * {
   *     "key1": "value1",
   *     "key2": "value2"
   * }
   * ```
   */
  Metadata: any;
  /** Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec. */
  Upload: any;
  /** _Any value scalar as defined by Federation spec. */
  _Any: any;
};

/** An enumeration. */
export enum AccountErrorCode {
  ACTIVATE_OWN_ACCOUNT = 'ACTIVATE_OWN_ACCOUNT',
  ACTIVATE_SUPERUSER_ACCOUNT = 'ACTIVATE_SUPERUSER_ACCOUNT',
  DUPLICATED_INPUT_ITEM = 'DUPLICATED_INPUT_ITEM',
  DEACTIVATE_OWN_ACCOUNT = 'DEACTIVATE_OWN_ACCOUNT',
  DEACTIVATE_SUPERUSER_ACCOUNT = 'DEACTIVATE_SUPERUSER_ACCOUNT',
  DELETE_NON_STAFF_USER = 'DELETE_NON_STAFF_USER',
  DELETE_OWN_ACCOUNT = 'DELETE_OWN_ACCOUNT',
  DELETE_STAFF_ACCOUNT = 'DELETE_STAFF_ACCOUNT',
  DELETE_SUPERUSER_ACCOUNT = 'DELETE_SUPERUSER_ACCOUNT',
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INACTIVE = 'INACTIVE',
  INVALID = 'INVALID',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  LEFT_NOT_MANAGEABLE_PERMISSION = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NOT_FOUND = 'NOT_FOUND',
  OUT_OF_SCOPE_USER = 'OUT_OF_SCOPE_USER',
  OUT_OF_SCOPE_GROUP = 'OUT_OF_SCOPE_GROUP',
  OUT_OF_SCOPE_PERMISSION = 'OUT_OF_SCOPE_PERMISSION',
  PASSWORD_ENTIRELY_NUMERIC = 'PASSWORD_ENTIRELY_NUMERIC',
  PASSWORD_TOO_COMMON = 'PASSWORD_TOO_COMMON',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORD_TOO_SIMILAR = 'PASSWORD_TOO_SIMILAR',
  REQUIRED = 'REQUIRED',
  UNIQUE = 'UNIQUE',
  JWT_SIGNATURE_EXPIRED = 'JWT_SIGNATURE_EXPIRED',
  JWT_INVALID_TOKEN = 'JWT_INVALID_TOKEN',
  JWT_DECODE_ERROR = 'JWT_DECODE_ERROR',
  JWT_MISSING_TOKEN = 'JWT_MISSING_TOKEN',
  JWT_INVALID_CSRF_TOKEN = 'JWT_INVALID_CSRF_TOKEN',
  CHANNEL_INACTIVE = 'CHANNEL_INACTIVE',
  MISSING_CHANNEL_SLUG = 'MISSING_CHANNEL_SLUG',
  ACCOUNT_NOT_CONFIRMED = 'ACCOUNT_NOT_CONFIRMED'
}

export type AccountInput = {
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
};

export type AccountRegisterInput = {
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** The email address of the user. */
  email: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Base of frontend URL that will be needed to create confirmation URL. */
  redirectUrl?: InputMaybe<Scalars['String']>;
  /** User public metadata. */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Slug of a channel which will be used to notify users. Optional when only one channel exists. */
  channel?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum AppErrorCode {
  FORBIDDEN = 'FORBIDDEN',
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INVALID = 'INVALID',
  INVALID_STATUS = 'INVALID_STATUS',
  INVALID_PERMISSION = 'INVALID_PERMISSION',
  INVALID_URL_FORMAT = 'INVALID_URL_FORMAT',
  INVALID_MANIFEST_FORMAT = 'INVALID_MANIFEST_FORMAT',
  MANIFEST_URL_CANT_CONNECT = 'MANIFEST_URL_CANT_CONNECT',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED = 'REQUIRED',
  UNIQUE = 'UNIQUE',
  OUT_OF_SCOPE_APP = 'OUT_OF_SCOPE_APP',
  OUT_OF_SCOPE_PERMISSION = 'OUT_OF_SCOPE_PERMISSION'
}

export type AppExtensionFilterInput = {
  mount?: InputMaybe<Array<AppExtensionMountEnum>>;
  target?: InputMaybe<AppExtensionTargetEnum>;
};

/** All places where app extension can be mounted. */
export enum AppExtensionMountEnum {
  CUSTOMER_OVERVIEW_CREATE = 'CUSTOMER_OVERVIEW_CREATE',
  CUSTOMER_OVERVIEW_MORE_ACTIONS = 'CUSTOMER_OVERVIEW_MORE_ACTIONS',
  CUSTOMER_DETAILS_MORE_ACTIONS = 'CUSTOMER_DETAILS_MORE_ACTIONS',
  INITIATIVE_OVERVIEW_CREATE = 'INITIATIVE_OVERVIEW_CREATE',
  INITIATIVE_OVERVIEW_MORE_ACTIONS = 'INITIATIVE_OVERVIEW_MORE_ACTIONS',
  INITIATIVE_DETAILS_MORE_ACTIONS = 'INITIATIVE_DETAILS_MORE_ACTIONS',
  NAVIGATION_CATALOG = 'NAVIGATION_CATALOG',
  NAVIGATION_ORDERS = 'NAVIGATION_ORDERS',
  NAVIGATION_CUSTOMERS = 'NAVIGATION_CUSTOMERS',
  NAVIGATION_DISCOUNTS = 'NAVIGATION_DISCOUNTS',
  NAVIGATION_TRANSLATIONS = 'NAVIGATION_TRANSLATIONS',
  NAVIGATION_PAGES = 'NAVIGATION_PAGES'
}

/**
 * All available ways of opening an app extension.
 *
 *     POPUP - app's extension will be mounted as a popup window
 *     APP_PAGE - redirect to app's page
 *
 */
export enum AppExtensionTargetEnum {
  POPUP = 'POPUP',
  APP_PAGE = 'APP_PAGE'
}

export type AppFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<AppTypeEnum>;
};

export type AppInput = {
  /** Name of the app. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to assign to this app. */
  permissions?: InputMaybe<Array<PermissionEnum>>;
};

export type AppInstallInput = {
  /** Name of the app to install. */
  appName?: InputMaybe<Scalars['String']>;
  /** Url to app's manifest in JSON format. */
  manifestUrl?: InputMaybe<Scalars['String']>;
  /** Determine if app will be set active or not. */
  activateAfterInstallation?: InputMaybe<Scalars['Boolean']>;
  /** List of permission code names to assign to this app. */
  permissions?: InputMaybe<Array<PermissionEnum>>;
};

export enum AppSortField {
  /** Sort apps by name. */
  NAME = 'NAME',
  /** Sort apps by creation date. */
  CREATION_DATE = 'CREATION_DATE'
}

export type AppSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort apps by the selected field. */
  field: AppSortField;
};

export type AppTokenInput = {
  /** Name of the token. */
  name?: InputMaybe<Scalars['String']>;
  /** ID of app. */
  app: Scalars['ID'];
};

/** Enum determining type of your App. */
export enum AppTypeEnum {
  /** Local Saleor App. The app is fully manageable from dashboard. You can change assigned permissions, add webhooks, or authentication token */
  LOCAL = 'LOCAL',
  /** Third party external App. Installation is fully automated. Saleor uses a defined App manifest to gather all required information. */
  THIRDPARTY = 'THIRDPARTY'
}

/** An enumeration. */
export enum AreaUnitsEnum {
  SQ_CM = 'SQ_CM',
  SQ_M = 'SQ_M',
  SQ_KM = 'SQ_KM',
  SQ_FT = 'SQ_FT',
  SQ_YD = 'SQ_YD',
  SQ_INCH = 'SQ_INCH'
}

/** An enumeration. */
export enum CountryCode {
  AF = 'AF',
  AX = 'AX',
  AL = 'AL',
  DZ = 'DZ',
  AS = 'AS',
  AD = 'AD',
  AO = 'AO',
  AI = 'AI',
  AQ = 'AQ',
  AG = 'AG',
  AR = 'AR',
  AM = 'AM',
  AW = 'AW',
  AU = 'AU',
  AT = 'AT',
  AZ = 'AZ',
  BS = 'BS',
  BH = 'BH',
  BD = 'BD',
  BB = 'BB',
  BY = 'BY',
  BE = 'BE',
  BZ = 'BZ',
  BJ = 'BJ',
  BM = 'BM',
  BT = 'BT',
  BO = 'BO',
  BQ = 'BQ',
  BA = 'BA',
  BW = 'BW',
  BV = 'BV',
  BR = 'BR',
  IO = 'IO',
  BN = 'BN',
  BG = 'BG',
  BF = 'BF',
  BI = 'BI',
  CV = 'CV',
  KH = 'KH',
  CM = 'CM',
  CA = 'CA',
  KY = 'KY',
  CF = 'CF',
  TD = 'TD',
  CL = 'CL',
  CN = 'CN',
  CX = 'CX',
  CC = 'CC',
  CO = 'CO',
  KM = 'KM',
  CG = 'CG',
  CD = 'CD',
  CK = 'CK',
  CR = 'CR',
  CI = 'CI',
  HR = 'HR',
  CU = 'CU',
  CW = 'CW',
  CY = 'CY',
  CZ = 'CZ',
  DK = 'DK',
  DJ = 'DJ',
  DM = 'DM',
  DO = 'DO',
  EC = 'EC',
  EG = 'EG',
  SV = 'SV',
  GQ = 'GQ',
  ER = 'ER',
  EE = 'EE',
  SZ = 'SZ',
  ET = 'ET',
  EU = 'EU',
  FK = 'FK',
  FO = 'FO',
  FJ = 'FJ',
  FI = 'FI',
  FR = 'FR',
  GF = 'GF',
  PF = 'PF',
  TF = 'TF',
  GA = 'GA',
  GM = 'GM',
  GE = 'GE',
  DE = 'DE',
  GH = 'GH',
  GI = 'GI',
  GR = 'GR',
  GL = 'GL',
  GD = 'GD',
  GP = 'GP',
  GU = 'GU',
  GT = 'GT',
  GG = 'GG',
  GN = 'GN',
  GW = 'GW',
  GY = 'GY',
  HT = 'HT',
  HM = 'HM',
  VA = 'VA',
  HN = 'HN',
  HK = 'HK',
  HU = 'HU',
  IS = 'IS',
  IN = 'IN',
  ID = 'ID',
  IR = 'IR',
  IQ = 'IQ',
  IE = 'IE',
  IM = 'IM',
  IL = 'IL',
  IT = 'IT',
  JM = 'JM',
  JP = 'JP',
  JE = 'JE',
  JO = 'JO',
  KZ = 'KZ',
  KE = 'KE',
  KI = 'KI',
  KW = 'KW',
  KG = 'KG',
  LA = 'LA',
  LV = 'LV',
  LB = 'LB',
  LS = 'LS',
  LR = 'LR',
  LY = 'LY',
  LI = 'LI',
  LT = 'LT',
  LU = 'LU',
  MO = 'MO',
  MG = 'MG',
  MW = 'MW',
  MY = 'MY',
  MV = 'MV',
  ML = 'ML',
  MT = 'MT',
  MH = 'MH',
  MQ = 'MQ',
  MR = 'MR',
  MU = 'MU',
  YT = 'YT',
  MX = 'MX',
  FM = 'FM',
  MD = 'MD',
  MC = 'MC',
  MN = 'MN',
  ME = 'ME',
  MS = 'MS',
  MA = 'MA',
  MZ = 'MZ',
  MM = 'MM',
  NA = 'NA',
  NR = 'NR',
  NP = 'NP',
  NL = 'NL',
  NC = 'NC',
  NZ = 'NZ',
  NI = 'NI',
  NE = 'NE',
  NG = 'NG',
  NU = 'NU',
  NF = 'NF',
  KP = 'KP',
  MK = 'MK',
  MP = 'MP',
  NO = 'NO',
  OM = 'OM',
  PK = 'PK',
  PW = 'PW',
  PS = 'PS',
  PA = 'PA',
  PG = 'PG',
  PY = 'PY',
  PE = 'PE',
  PH = 'PH',
  PN = 'PN',
  PL = 'PL',
  PT = 'PT',
  PR = 'PR',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RU = 'RU',
  RW = 'RW',
  BL = 'BL',
  SH = 'SH',
  KN = 'KN',
  LC = 'LC',
  MF = 'MF',
  PM = 'PM',
  VC = 'VC',
  WS = 'WS',
  SM = 'SM',
  ST = 'ST',
  SA = 'SA',
  SN = 'SN',
  RS = 'RS',
  SC = 'SC',
  SL = 'SL',
  SG = 'SG',
  SX = 'SX',
  SK = 'SK',
  SI = 'SI',
  SB = 'SB',
  SO = 'SO',
  ZA = 'ZA',
  GS = 'GS',
  KR = 'KR',
  SS = 'SS',
  ES = 'ES',
  LK = 'LK',
  SD = 'SD',
  SR = 'SR',
  SJ = 'SJ',
  SE = 'SE',
  CH = 'CH',
  SY = 'SY',
  TW = 'TW',
  TJ = 'TJ',
  TZ = 'TZ',
  TH = 'TH',
  TL = 'TL',
  TG = 'TG',
  TK = 'TK',
  TO = 'TO',
  TT = 'TT',
  TN = 'TN',
  TR = 'TR',
  TM = 'TM',
  TC = 'TC',
  TV = 'TV',
  UG = 'UG',
  UA = 'UA',
  AE = 'AE',
  GB = 'GB',
  UM = 'UM',
  US = 'US',
  UY = 'UY',
  UZ = 'UZ',
  VU = 'VU',
  VE = 'VE',
  VN = 'VN',
  VG = 'VG',
  VI = 'VI',
  WF = 'WF',
  EH = 'EH',
  YE = 'YE',
  ZM = 'ZM',
  ZW = 'ZW'
}

/** An enumeration. */
export enum CustomerEventsEnum {
  ACCOUNT_CREATED = 'ACCOUNT_CREATED',
  ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
  ACCOUNT_DEACTIVATED = 'ACCOUNT_DEACTIVATED',
  PASSWORD_RESET_LINK_SENT = 'PASSWORD_RESET_LINK_SENT',
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_CHANGED_REQUEST = 'EMAIL_CHANGED_REQUEST',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  EMAIL_CHANGED = 'EMAIL_CHANGED',
  PLACED_ORDER = 'PLACED_ORDER',
  NOTE_ADDED_TO_ORDER = 'NOTE_ADDED_TO_ORDER',
  DIGITAL_LINK_DOWNLOADED = 'DIGITAL_LINK_DOWNLOADED',
  CUSTOMER_DELETED = 'CUSTOMER_DELETED',
  NAME_ASSIGNED = 'NAME_ASSIGNED',
  EMAIL_ASSIGNED = 'EMAIL_ASSIGNED',
  NOTE_ADDED = 'NOTE_ADDED'
}

export type CustomerFilterInput = {
  dateJoined?: InputMaybe<DateRangeInput>;
  numberOfOrders?: InputMaybe<IntRangeInput>;
  placedOrders?: InputMaybe<DateRangeInput>;
  search?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
};

export type CustomerInput = {
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
};

export type DateRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['Date']>;
  /** End date. */
  lte?: InputMaybe<Scalars['Date']>;
};

export type DateTimeRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** End date. */
  lte?: InputMaybe<Scalars['DateTime']>;
};

/** An enumeration. */
export enum DistanceUnitsEnum {
  CM = 'CM',
  M = 'M',
  KM = 'KM',
  FT = 'FT',
  YD = 'YD',
  INCH = 'INCH'
}

export enum EventDeliveryAttemptSortField {
  /** Sort event delivery attempts by created at. */
  CREATED_AT = 'CREATED_AT'
}

export type EventDeliveryAttemptSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort attempts by the selected field. */
  field: EventDeliveryAttemptSortField;
};

export type EventDeliveryFilterInput = {
  status?: InputMaybe<EventDeliveryStatusEnum>;
  eventType?: InputMaybe<WebhookEventTypeEnum>;
};

export enum EventDeliverySortField {
  /** Sort event deliveries by created at. */
  CREATED_AT = 'CREATED_AT'
}

export type EventDeliverySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort deliveries by the selected field. */
  field: EventDeliverySortField;
};

export enum EventDeliveryStatusEnum {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

/** An enumeration. */
export enum ExportErrorCode {
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INVALID = 'INVALID',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED = 'REQUIRED'
}

/** An enumeration. */
export enum ExportEventsEnum {
  EXPORT_PENDING = 'EXPORT_PENDING',
  EXPORT_SUCCESS = 'EXPORT_SUCCESS',
  EXPORT_FAILED = 'EXPORT_FAILED',
  EXPORT_DELETED = 'EXPORT_DELETED',
  EXPORTED_FILE_SENT = 'EXPORTED_FILE_SENT',
  EXPORT_FAILED_INFO_SENT = 'EXPORT_FAILED_INFO_SENT'
}

export type ExportFileFilterInput = {
  createdAt?: InputMaybe<DateTimeRangeInput>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<JobStatusEnum>;
  user?: InputMaybe<Scalars['String']>;
  app?: InputMaybe<Scalars['String']>;
};

export enum ExportFileSortField {
  STATUS = 'STATUS',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  LAST_MODIFIED_AT = 'LAST_MODIFIED_AT'
}

export type ExportFileSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort export file by the selected field. */
  field: ExportFileSortField;
};

export type ExportInfoInput = {
  /** List of attribute ids witch should be exported. */
  attributes?: InputMaybe<Array<Scalars['ID']>>;
  /** List of warehouse ids witch should be exported. */
  warehouses?: InputMaybe<Array<Scalars['ID']>>;
  /** List of channels ids which should be exported. */
  channels?: InputMaybe<Array<Scalars['ID']>>;
  /** List of initiative fields witch should be exported. */
  fields?: InputMaybe<Array<InitiativeFieldEnum>>;
};

export type ExportInitiativesInput = {
  /** Determine which initiatives should be exported. */
  scope: ExportScope;
  /** Filtering options for initiatives. */
  filter?: InputMaybe<InitiativeFilterInput>;
  /** List of initiatives IDs to export. */
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /** Input with info about fields which should be exported. */
  exportInfo?: InputMaybe<ExportInfoInput>;
  /** Type of exported file. */
  fileType: FileTypesEnum;
};

export enum ExportScope {
  /** Export all initiatives. */
  ALL = 'ALL',
  /** Export initiatives with given ids. */
  IDS = 'IDS',
  /** Export the filtered initiatives. */
  FILTER = 'FILTER'
}

/** An enumeration. */
export enum FileTypesEnum {
  CSV = 'CSV',
  XLSX = 'XLSX'
}

export type InitiativeCreateInput = {
  /** Initiative title. */
  title?: InputMaybe<Scalars['String']>;
  /** Initiative slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
};

/** An enumeration. */
export enum InitiativeErrorCode {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  MEDIA_ALREADY_ASSIGNED = 'MEDIA_ALREADY_ASSIGNED',
  DUPLICATED_INPUT_ITEM = 'DUPLICATED_INPUT_ITEM',
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INVALID = 'INVALID',
  NOT_INITIATIVES_IMAGE = 'NOT_INITIATIVES_IMAGE',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED = 'REQUIRED',
  UNIQUE = 'UNIQUE',
  UNSUPPORTED_MEDIA_PROVIDER = 'UNSUPPORTED_MEDIA_PROVIDER'
}

export enum InitiativeFieldEnum {
  NAME = 'NAME',
  DESCRIPTION = 'DESCRIPTION',
  INITIATIVE_TYPE = 'INITIATIVE_TYPE',
  CATEGORY = 'CATEGORY',
  INITIATIVE_WEIGHT = 'INITIATIVE_WEIGHT',
  COLLECTIONS = 'COLLECTIONS',
  CHARGE_TAXES = 'CHARGE_TAXES',
  INITIATIVE_MEDIA = 'INITIATIVE_MEDIA',
  VARIANT_ID = 'VARIANT_ID',
  VARIANT_SKU = 'VARIANT_SKU',
  VARIANT_WEIGHT = 'VARIANT_WEIGHT',
  VARIANT_MEDIA = 'VARIANT_MEDIA'
}

export type InitiativeFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Specifies the channel by which the data should be filtered.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
};

export type InitiativeInput = {
  /** Initiative title. */
  title?: InputMaybe<Scalars['String']>;
  /** Initiative slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
};

export type InitiativeMediaCreateInput = {
  /** Alt text for a initiative media. */
  alt?: InputMaybe<Scalars['String']>;
  /** Represents an image file in a multipart request. */
  image?: InputMaybe<Scalars['Upload']>;
  /** ID of an initiative. */
  initiative: Scalars['ID'];
  /** Represents an URL to an external media. */
  mediaUrl?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum InitiativeMediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export type InitiativeMediaUpdateInput = {
  /** Alt text for a initiative media. */
  alt?: InputMaybe<Scalars['String']>;
};

export type InitiativeOrder = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /**
   * Specifies the channel in which to sort the data.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  /**
   * Sort initiative by the selected attribute's values.
   * Note: this doesn't take translations into account yet.
   */
  attributeId?: InputMaybe<Scalars['ID']>;
  /** Sort initiatives by the selected field. */
  field?: InputMaybe<InitiativeOrderField>;
};

export enum InitiativeOrderField {
  NAME = 'NAME',
  RANK = 'RANK',
  LAST_MODIFIED = 'LAST_MODIFIED',
  DATE = 'DATE',
  LAST_MODIFIED_AT = 'LAST_MODIFIED_AT'
}

export type IntRangeInput = {
  /** Value greater than or equal to. */
  gte?: InputMaybe<Scalars['Int']>;
  /** Value less than or equal to. */
  lte?: InputMaybe<Scalars['Int']>;
};

/** An enumeration. */
export enum JobStatusEnum {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  DELETED = 'DELETED'
}

/** An enumeration. */
export enum LanguageCodeEnum {
  AF = 'AF',
  AF_NA = 'AF_NA',
  AF_ZA = 'AF_ZA',
  AGQ = 'AGQ',
  AGQ_CM = 'AGQ_CM',
  AK = 'AK',
  AK_GH = 'AK_GH',
  AM = 'AM',
  AM_ET = 'AM_ET',
  AR = 'AR',
  AR_AE = 'AR_AE',
  AR_BH = 'AR_BH',
  AR_DJ = 'AR_DJ',
  AR_DZ = 'AR_DZ',
  AR_EG = 'AR_EG',
  AR_EH = 'AR_EH',
  AR_ER = 'AR_ER',
  AR_IL = 'AR_IL',
  AR_IQ = 'AR_IQ',
  AR_JO = 'AR_JO',
  AR_KM = 'AR_KM',
  AR_KW = 'AR_KW',
  AR_LB = 'AR_LB',
  AR_LY = 'AR_LY',
  AR_MA = 'AR_MA',
  AR_MR = 'AR_MR',
  AR_OM = 'AR_OM',
  AR_PS = 'AR_PS',
  AR_QA = 'AR_QA',
  AR_SA = 'AR_SA',
  AR_SD = 'AR_SD',
  AR_SO = 'AR_SO',
  AR_SS = 'AR_SS',
  AR_SY = 'AR_SY',
  AR_TD = 'AR_TD',
  AR_TN = 'AR_TN',
  AR_YE = 'AR_YE',
  AS = 'AS',
  AS_IN = 'AS_IN',
  ASA = 'ASA',
  ASA_TZ = 'ASA_TZ',
  AST = 'AST',
  AST_ES = 'AST_ES',
  AZ = 'AZ',
  AZ_CYRL = 'AZ_CYRL',
  AZ_CYRL_AZ = 'AZ_CYRL_AZ',
  AZ_LATN = 'AZ_LATN',
  AZ_LATN_AZ = 'AZ_LATN_AZ',
  BAS = 'BAS',
  BAS_CM = 'BAS_CM',
  BE = 'BE',
  BE_BY = 'BE_BY',
  BEM = 'BEM',
  BEM_ZM = 'BEM_ZM',
  BEZ = 'BEZ',
  BEZ_TZ = 'BEZ_TZ',
  BG = 'BG',
  BG_BG = 'BG_BG',
  BM = 'BM',
  BM_ML = 'BM_ML',
  BN = 'BN',
  BN_BD = 'BN_BD',
  BN_IN = 'BN_IN',
  BO = 'BO',
  BO_CN = 'BO_CN',
  BO_IN = 'BO_IN',
  BR = 'BR',
  BR_FR = 'BR_FR',
  BRX = 'BRX',
  BRX_IN = 'BRX_IN',
  BS = 'BS',
  BS_CYRL = 'BS_CYRL',
  BS_CYRL_BA = 'BS_CYRL_BA',
  BS_LATN = 'BS_LATN',
  BS_LATN_BA = 'BS_LATN_BA',
  CA = 'CA',
  CA_AD = 'CA_AD',
  CA_ES = 'CA_ES',
  CA_ES_VALENCIA = 'CA_ES_VALENCIA',
  CA_FR = 'CA_FR',
  CA_IT = 'CA_IT',
  CCP = 'CCP',
  CCP_BD = 'CCP_BD',
  CCP_IN = 'CCP_IN',
  CE = 'CE',
  CE_RU = 'CE_RU',
  CEB = 'CEB',
  CEB_PH = 'CEB_PH',
  CGG = 'CGG',
  CGG_UG = 'CGG_UG',
  CHR = 'CHR',
  CHR_US = 'CHR_US',
  CKB = 'CKB',
  CKB_IQ = 'CKB_IQ',
  CKB_IR = 'CKB_IR',
  CS = 'CS',
  CS_CZ = 'CS_CZ',
  CU = 'CU',
  CU_RU = 'CU_RU',
  CY = 'CY',
  CY_GB = 'CY_GB',
  DA = 'DA',
  DA_DK = 'DA_DK',
  DA_GL = 'DA_GL',
  DAV = 'DAV',
  DAV_KE = 'DAV_KE',
  DE = 'DE',
  DE_AT = 'DE_AT',
  DE_BE = 'DE_BE',
  DE_CH = 'DE_CH',
  DE_DE = 'DE_DE',
  DE_IT = 'DE_IT',
  DE_LI = 'DE_LI',
  DE_LU = 'DE_LU',
  DJE = 'DJE',
  DJE_NE = 'DJE_NE',
  DSB = 'DSB',
  DSB_DE = 'DSB_DE',
  DUA = 'DUA',
  DUA_CM = 'DUA_CM',
  DYO = 'DYO',
  DYO_SN = 'DYO_SN',
  DZ = 'DZ',
  DZ_BT = 'DZ_BT',
  EBU = 'EBU',
  EBU_KE = 'EBU_KE',
  EE = 'EE',
  EE_GH = 'EE_GH',
  EE_TG = 'EE_TG',
  EL = 'EL',
  EL_CY = 'EL_CY',
  EL_GR = 'EL_GR',
  EN = 'EN',
  EN_AE = 'EN_AE',
  EN_AG = 'EN_AG',
  EN_AI = 'EN_AI',
  EN_AS = 'EN_AS',
  EN_AT = 'EN_AT',
  EN_AU = 'EN_AU',
  EN_BB = 'EN_BB',
  EN_BE = 'EN_BE',
  EN_BI = 'EN_BI',
  EN_BM = 'EN_BM',
  EN_BS = 'EN_BS',
  EN_BW = 'EN_BW',
  EN_BZ = 'EN_BZ',
  EN_CA = 'EN_CA',
  EN_CC = 'EN_CC',
  EN_CH = 'EN_CH',
  EN_CK = 'EN_CK',
  EN_CM = 'EN_CM',
  EN_CX = 'EN_CX',
  EN_CY = 'EN_CY',
  EN_DE = 'EN_DE',
  EN_DG = 'EN_DG',
  EN_DK = 'EN_DK',
  EN_DM = 'EN_DM',
  EN_ER = 'EN_ER',
  EN_FI = 'EN_FI',
  EN_FJ = 'EN_FJ',
  EN_FK = 'EN_FK',
  EN_FM = 'EN_FM',
  EN_GB = 'EN_GB',
  EN_GD = 'EN_GD',
  EN_GG = 'EN_GG',
  EN_GH = 'EN_GH',
  EN_GI = 'EN_GI',
  EN_GM = 'EN_GM',
  EN_GU = 'EN_GU',
  EN_GY = 'EN_GY',
  EN_HK = 'EN_HK',
  EN_IE = 'EN_IE',
  EN_IL = 'EN_IL',
  EN_IM = 'EN_IM',
  EN_IN = 'EN_IN',
  EN_IO = 'EN_IO',
  EN_JE = 'EN_JE',
  EN_JM = 'EN_JM',
  EN_KE = 'EN_KE',
  EN_KI = 'EN_KI',
  EN_KN = 'EN_KN',
  EN_KY = 'EN_KY',
  EN_LC = 'EN_LC',
  EN_LR = 'EN_LR',
  EN_LS = 'EN_LS',
  EN_MG = 'EN_MG',
  EN_MH = 'EN_MH',
  EN_MO = 'EN_MO',
  EN_MP = 'EN_MP',
  EN_MS = 'EN_MS',
  EN_MT = 'EN_MT',
  EN_MU = 'EN_MU',
  EN_MW = 'EN_MW',
  EN_MY = 'EN_MY',
  EN_NA = 'EN_NA',
  EN_NF = 'EN_NF',
  EN_NG = 'EN_NG',
  EN_NL = 'EN_NL',
  EN_NR = 'EN_NR',
  EN_NU = 'EN_NU',
  EN_NZ = 'EN_NZ',
  EN_PG = 'EN_PG',
  EN_PH = 'EN_PH',
  EN_PK = 'EN_PK',
  EN_PN = 'EN_PN',
  EN_PR = 'EN_PR',
  EN_PW = 'EN_PW',
  EN_RW = 'EN_RW',
  EN_SB = 'EN_SB',
  EN_SC = 'EN_SC',
  EN_SD = 'EN_SD',
  EN_SE = 'EN_SE',
  EN_SG = 'EN_SG',
  EN_SH = 'EN_SH',
  EN_SI = 'EN_SI',
  EN_SL = 'EN_SL',
  EN_SS = 'EN_SS',
  EN_SX = 'EN_SX',
  EN_SZ = 'EN_SZ',
  EN_TC = 'EN_TC',
  EN_TK = 'EN_TK',
  EN_TO = 'EN_TO',
  EN_TT = 'EN_TT',
  EN_TV = 'EN_TV',
  EN_TZ = 'EN_TZ',
  EN_UG = 'EN_UG',
  EN_UM = 'EN_UM',
  EN_US = 'EN_US',
  EN_VC = 'EN_VC',
  EN_VG = 'EN_VG',
  EN_VI = 'EN_VI',
  EN_VU = 'EN_VU',
  EN_WS = 'EN_WS',
  EN_ZA = 'EN_ZA',
  EN_ZM = 'EN_ZM',
  EN_ZW = 'EN_ZW',
  EO = 'EO',
  ES = 'ES',
  ES_AR = 'ES_AR',
  ES_BO = 'ES_BO',
  ES_BR = 'ES_BR',
  ES_BZ = 'ES_BZ',
  ES_CL = 'ES_CL',
  ES_CO = 'ES_CO',
  ES_CR = 'ES_CR',
  ES_CU = 'ES_CU',
  ES_DO = 'ES_DO',
  ES_EA = 'ES_EA',
  ES_EC = 'ES_EC',
  ES_ES = 'ES_ES',
  ES_GQ = 'ES_GQ',
  ES_GT = 'ES_GT',
  ES_HN = 'ES_HN',
  ES_IC = 'ES_IC',
  ES_MX = 'ES_MX',
  ES_NI = 'ES_NI',
  ES_PA = 'ES_PA',
  ES_PE = 'ES_PE',
  ES_PH = 'ES_PH',
  ES_PR = 'ES_PR',
  ES_PY = 'ES_PY',
  ES_SV = 'ES_SV',
  ES_US = 'ES_US',
  ES_UY = 'ES_UY',
  ES_VE = 'ES_VE',
  ET = 'ET',
  ET_EE = 'ET_EE',
  EU = 'EU',
  EU_ES = 'EU_ES',
  EWO = 'EWO',
  EWO_CM = 'EWO_CM',
  FA = 'FA',
  FA_AF = 'FA_AF',
  FA_IR = 'FA_IR',
  FF = 'FF',
  FF_ADLM = 'FF_ADLM',
  FF_ADLM_BF = 'FF_ADLM_BF',
  FF_ADLM_CM = 'FF_ADLM_CM',
  FF_ADLM_GH = 'FF_ADLM_GH',
  FF_ADLM_GM = 'FF_ADLM_GM',
  FF_ADLM_GN = 'FF_ADLM_GN',
  FF_ADLM_GW = 'FF_ADLM_GW',
  FF_ADLM_LR = 'FF_ADLM_LR',
  FF_ADLM_MR = 'FF_ADLM_MR',
  FF_ADLM_NE = 'FF_ADLM_NE',
  FF_ADLM_NG = 'FF_ADLM_NG',
  FF_ADLM_SL = 'FF_ADLM_SL',
  FF_ADLM_SN = 'FF_ADLM_SN',
  FF_LATN = 'FF_LATN',
  FF_LATN_BF = 'FF_LATN_BF',
  FF_LATN_CM = 'FF_LATN_CM',
  FF_LATN_GH = 'FF_LATN_GH',
  FF_LATN_GM = 'FF_LATN_GM',
  FF_LATN_GN = 'FF_LATN_GN',
  FF_LATN_GW = 'FF_LATN_GW',
  FF_LATN_LR = 'FF_LATN_LR',
  FF_LATN_MR = 'FF_LATN_MR',
  FF_LATN_NE = 'FF_LATN_NE',
  FF_LATN_NG = 'FF_LATN_NG',
  FF_LATN_SL = 'FF_LATN_SL',
  FF_LATN_SN = 'FF_LATN_SN',
  FI = 'FI',
  FI_FI = 'FI_FI',
  FIL = 'FIL',
  FIL_PH = 'FIL_PH',
  FO = 'FO',
  FO_DK = 'FO_DK',
  FO_FO = 'FO_FO',
  FR = 'FR',
  FR_BE = 'FR_BE',
  FR_BF = 'FR_BF',
  FR_BI = 'FR_BI',
  FR_BJ = 'FR_BJ',
  FR_BL = 'FR_BL',
  FR_CA = 'FR_CA',
  FR_CD = 'FR_CD',
  FR_CF = 'FR_CF',
  FR_CG = 'FR_CG',
  FR_CH = 'FR_CH',
  FR_CI = 'FR_CI',
  FR_CM = 'FR_CM',
  FR_DJ = 'FR_DJ',
  FR_DZ = 'FR_DZ',
  FR_FR = 'FR_FR',
  FR_GA = 'FR_GA',
  FR_GF = 'FR_GF',
  FR_GN = 'FR_GN',
  FR_GP = 'FR_GP',
  FR_GQ = 'FR_GQ',
  FR_HT = 'FR_HT',
  FR_KM = 'FR_KM',
  FR_LU = 'FR_LU',
  FR_MA = 'FR_MA',
  FR_MC = 'FR_MC',
  FR_MF = 'FR_MF',
  FR_MG = 'FR_MG',
  FR_ML = 'FR_ML',
  FR_MQ = 'FR_MQ',
  FR_MR = 'FR_MR',
  FR_MU = 'FR_MU',
  FR_NC = 'FR_NC',
  FR_NE = 'FR_NE',
  FR_PF = 'FR_PF',
  FR_PM = 'FR_PM',
  FR_RE = 'FR_RE',
  FR_RW = 'FR_RW',
  FR_SC = 'FR_SC',
  FR_SN = 'FR_SN',
  FR_SY = 'FR_SY',
  FR_TD = 'FR_TD',
  FR_TG = 'FR_TG',
  FR_TN = 'FR_TN',
  FR_VU = 'FR_VU',
  FR_WF = 'FR_WF',
  FR_YT = 'FR_YT',
  FUR = 'FUR',
  FUR_IT = 'FUR_IT',
  FY = 'FY',
  FY_NL = 'FY_NL',
  GA = 'GA',
  GA_GB = 'GA_GB',
  GA_IE = 'GA_IE',
  GD = 'GD',
  GD_GB = 'GD_GB',
  GL = 'GL',
  GL_ES = 'GL_ES',
  GSW = 'GSW',
  GSW_CH = 'GSW_CH',
  GSW_FR = 'GSW_FR',
  GSW_LI = 'GSW_LI',
  GU = 'GU',
  GU_IN = 'GU_IN',
  GUZ = 'GUZ',
  GUZ_KE = 'GUZ_KE',
  GV = 'GV',
  GV_IM = 'GV_IM',
  HA = 'HA',
  HA_GH = 'HA_GH',
  HA_NE = 'HA_NE',
  HA_NG = 'HA_NG',
  HAW = 'HAW',
  HAW_US = 'HAW_US',
  HE = 'HE',
  HE_IL = 'HE_IL',
  HI = 'HI',
  HI_IN = 'HI_IN',
  HR = 'HR',
  HR_BA = 'HR_BA',
  HR_HR = 'HR_HR',
  HSB = 'HSB',
  HSB_DE = 'HSB_DE',
  HU = 'HU',
  HU_HU = 'HU_HU',
  HY = 'HY',
  HY_AM = 'HY_AM',
  IA = 'IA',
  ID = 'ID',
  ID_ID = 'ID_ID',
  IG = 'IG',
  IG_NG = 'IG_NG',
  II = 'II',
  II_CN = 'II_CN',
  IS = 'IS',
  IS_IS = 'IS_IS',
  IT = 'IT',
  IT_CH = 'IT_CH',
  IT_IT = 'IT_IT',
  IT_SM = 'IT_SM',
  IT_VA = 'IT_VA',
  JA = 'JA',
  JA_JP = 'JA_JP',
  JGO = 'JGO',
  JGO_CM = 'JGO_CM',
  JMC = 'JMC',
  JMC_TZ = 'JMC_TZ',
  JV = 'JV',
  JV_ID = 'JV_ID',
  KA = 'KA',
  KA_GE = 'KA_GE',
  KAB = 'KAB',
  KAB_DZ = 'KAB_DZ',
  KAM = 'KAM',
  KAM_KE = 'KAM_KE',
  KDE = 'KDE',
  KDE_TZ = 'KDE_TZ',
  KEA = 'KEA',
  KEA_CV = 'KEA_CV',
  KHQ = 'KHQ',
  KHQ_ML = 'KHQ_ML',
  KI = 'KI',
  KI_KE = 'KI_KE',
  KK = 'KK',
  KK_KZ = 'KK_KZ',
  KKJ = 'KKJ',
  KKJ_CM = 'KKJ_CM',
  KL = 'KL',
  KL_GL = 'KL_GL',
  KLN = 'KLN',
  KLN_KE = 'KLN_KE',
  KM = 'KM',
  KM_KH = 'KM_KH',
  KN = 'KN',
  KN_IN = 'KN_IN',
  KO = 'KO',
  KO_KP = 'KO_KP',
  KO_KR = 'KO_KR',
  KOK = 'KOK',
  KOK_IN = 'KOK_IN',
  KS = 'KS',
  KS_ARAB = 'KS_ARAB',
  KS_ARAB_IN = 'KS_ARAB_IN',
  KSB = 'KSB',
  KSB_TZ = 'KSB_TZ',
  KSF = 'KSF',
  KSF_CM = 'KSF_CM',
  KSH = 'KSH',
  KSH_DE = 'KSH_DE',
  KU = 'KU',
  KU_TR = 'KU_TR',
  KW = 'KW',
  KW_GB = 'KW_GB',
  KY = 'KY',
  KY_KG = 'KY_KG',
  LAG = 'LAG',
  LAG_TZ = 'LAG_TZ',
  LB = 'LB',
  LB_LU = 'LB_LU',
  LG = 'LG',
  LG_UG = 'LG_UG',
  LKT = 'LKT',
  LKT_US = 'LKT_US',
  LN = 'LN',
  LN_AO = 'LN_AO',
  LN_CD = 'LN_CD',
  LN_CF = 'LN_CF',
  LN_CG = 'LN_CG',
  LO = 'LO',
  LO_LA = 'LO_LA',
  LRC = 'LRC',
  LRC_IQ = 'LRC_IQ',
  LRC_IR = 'LRC_IR',
  LT = 'LT',
  LT_LT = 'LT_LT',
  LU = 'LU',
  LU_CD = 'LU_CD',
  LUO = 'LUO',
  LUO_KE = 'LUO_KE',
  LUY = 'LUY',
  LUY_KE = 'LUY_KE',
  LV = 'LV',
  LV_LV = 'LV_LV',
  MAI = 'MAI',
  MAI_IN = 'MAI_IN',
  MAS = 'MAS',
  MAS_KE = 'MAS_KE',
  MAS_TZ = 'MAS_TZ',
  MER = 'MER',
  MER_KE = 'MER_KE',
  MFE = 'MFE',
  MFE_MU = 'MFE_MU',
  MG = 'MG',
  MG_MG = 'MG_MG',
  MGH = 'MGH',
  MGH_MZ = 'MGH_MZ',
  MGO = 'MGO',
  MGO_CM = 'MGO_CM',
  MI = 'MI',
  MI_NZ = 'MI_NZ',
  MK = 'MK',
  MK_MK = 'MK_MK',
  ML = 'ML',
  ML_IN = 'ML_IN',
  MN = 'MN',
  MN_MN = 'MN_MN',
  MNI = 'MNI',
  MNI_BENG = 'MNI_BENG',
  MNI_BENG_IN = 'MNI_BENG_IN',
  MR = 'MR',
  MR_IN = 'MR_IN',
  MS = 'MS',
  MS_BN = 'MS_BN',
  MS_ID = 'MS_ID',
  MS_MY = 'MS_MY',
  MS_SG = 'MS_SG',
  MT = 'MT',
  MT_MT = 'MT_MT',
  MUA = 'MUA',
  MUA_CM = 'MUA_CM',
  MY = 'MY',
  MY_MM = 'MY_MM',
  MZN = 'MZN',
  MZN_IR = 'MZN_IR',
  NAQ = 'NAQ',
  NAQ_NA = 'NAQ_NA',
  NB = 'NB',
  NB_NO = 'NB_NO',
  NB_SJ = 'NB_SJ',
  ND = 'ND',
  ND_ZW = 'ND_ZW',
  NDS = 'NDS',
  NDS_DE = 'NDS_DE',
  NDS_NL = 'NDS_NL',
  NE = 'NE',
  NE_IN = 'NE_IN',
  NE_NP = 'NE_NP',
  NL = 'NL',
  NL_AW = 'NL_AW',
  NL_BE = 'NL_BE',
  NL_BQ = 'NL_BQ',
  NL_CW = 'NL_CW',
  NL_NL = 'NL_NL',
  NL_SR = 'NL_SR',
  NL_SX = 'NL_SX',
  NMG = 'NMG',
  NMG_CM = 'NMG_CM',
  NN = 'NN',
  NN_NO = 'NN_NO',
  NNH = 'NNH',
  NNH_CM = 'NNH_CM',
  NUS = 'NUS',
  NUS_SS = 'NUS_SS',
  NYN = 'NYN',
  NYN_UG = 'NYN_UG',
  OM = 'OM',
  OM_ET = 'OM_ET',
  OM_KE = 'OM_KE',
  OR = 'OR',
  OR_IN = 'OR_IN',
  OS = 'OS',
  OS_GE = 'OS_GE',
  OS_RU = 'OS_RU',
  PA = 'PA',
  PA_ARAB = 'PA_ARAB',
  PA_ARAB_PK = 'PA_ARAB_PK',
  PA_GURU = 'PA_GURU',
  PA_GURU_IN = 'PA_GURU_IN',
  PCM = 'PCM',
  PCM_NG = 'PCM_NG',
  PL = 'PL',
  PL_PL = 'PL_PL',
  PRG = 'PRG',
  PS = 'PS',
  PS_AF = 'PS_AF',
  PS_PK = 'PS_PK',
  PT = 'PT',
  PT_AO = 'PT_AO',
  PT_BR = 'PT_BR',
  PT_CH = 'PT_CH',
  PT_CV = 'PT_CV',
  PT_GQ = 'PT_GQ',
  PT_GW = 'PT_GW',
  PT_LU = 'PT_LU',
  PT_MO = 'PT_MO',
  PT_MZ = 'PT_MZ',
  PT_PT = 'PT_PT',
  PT_ST = 'PT_ST',
  PT_TL = 'PT_TL',
  QU = 'QU',
  QU_BO = 'QU_BO',
  QU_EC = 'QU_EC',
  QU_PE = 'QU_PE',
  RM = 'RM',
  RM_CH = 'RM_CH',
  RN = 'RN',
  RN_BI = 'RN_BI',
  RO = 'RO',
  RO_MD = 'RO_MD',
  RO_RO = 'RO_RO',
  ROF = 'ROF',
  ROF_TZ = 'ROF_TZ',
  RU = 'RU',
  RU_BY = 'RU_BY',
  RU_KG = 'RU_KG',
  RU_KZ = 'RU_KZ',
  RU_MD = 'RU_MD',
  RU_RU = 'RU_RU',
  RU_UA = 'RU_UA',
  RW = 'RW',
  RW_RW = 'RW_RW',
  RWK = 'RWK',
  RWK_TZ = 'RWK_TZ',
  SAH = 'SAH',
  SAH_RU = 'SAH_RU',
  SAQ = 'SAQ',
  SAQ_KE = 'SAQ_KE',
  SAT = 'SAT',
  SAT_OLCK = 'SAT_OLCK',
  SAT_OLCK_IN = 'SAT_OLCK_IN',
  SBP = 'SBP',
  SBP_TZ = 'SBP_TZ',
  SD = 'SD',
  SD_ARAB = 'SD_ARAB',
  SD_ARAB_PK = 'SD_ARAB_PK',
  SD_DEVA = 'SD_DEVA',
  SD_DEVA_IN = 'SD_DEVA_IN',
  SE = 'SE',
  SE_FI = 'SE_FI',
  SE_NO = 'SE_NO',
  SE_SE = 'SE_SE',
  SEH = 'SEH',
  SEH_MZ = 'SEH_MZ',
  SES = 'SES',
  SES_ML = 'SES_ML',
  SG = 'SG',
  SG_CF = 'SG_CF',
  SHI = 'SHI',
  SHI_LATN = 'SHI_LATN',
  SHI_LATN_MA = 'SHI_LATN_MA',
  SHI_TFNG = 'SHI_TFNG',
  SHI_TFNG_MA = 'SHI_TFNG_MA',
  SI = 'SI',
  SI_LK = 'SI_LK',
  SK = 'SK',
  SK_SK = 'SK_SK',
  SL = 'SL',
  SL_SI = 'SL_SI',
  SMN = 'SMN',
  SMN_FI = 'SMN_FI',
  SN = 'SN',
  SN_ZW = 'SN_ZW',
  SO = 'SO',
  SO_DJ = 'SO_DJ',
  SO_ET = 'SO_ET',
  SO_KE = 'SO_KE',
  SO_SO = 'SO_SO',
  SQ = 'SQ',
  SQ_AL = 'SQ_AL',
  SQ_MK = 'SQ_MK',
  SQ_XK = 'SQ_XK',
  SR = 'SR',
  SR_CYRL = 'SR_CYRL',
  SR_CYRL_BA = 'SR_CYRL_BA',
  SR_CYRL_ME = 'SR_CYRL_ME',
  SR_CYRL_RS = 'SR_CYRL_RS',
  SR_CYRL_XK = 'SR_CYRL_XK',
  SR_LATN = 'SR_LATN',
  SR_LATN_BA = 'SR_LATN_BA',
  SR_LATN_ME = 'SR_LATN_ME',
  SR_LATN_RS = 'SR_LATN_RS',
  SR_LATN_XK = 'SR_LATN_XK',
  SU = 'SU',
  SU_LATN = 'SU_LATN',
  SU_LATN_ID = 'SU_LATN_ID',
  SV = 'SV',
  SV_AX = 'SV_AX',
  SV_FI = 'SV_FI',
  SV_SE = 'SV_SE',
  SW = 'SW',
  SW_CD = 'SW_CD',
  SW_KE = 'SW_KE',
  SW_TZ = 'SW_TZ',
  SW_UG = 'SW_UG',
  TA = 'TA',
  TA_IN = 'TA_IN',
  TA_LK = 'TA_LK',
  TA_MY = 'TA_MY',
  TA_SG = 'TA_SG',
  TE = 'TE',
  TE_IN = 'TE_IN',
  TEO = 'TEO',
  TEO_KE = 'TEO_KE',
  TEO_UG = 'TEO_UG',
  TG = 'TG',
  TG_TJ = 'TG_TJ',
  TH = 'TH',
  TH_TH = 'TH_TH',
  TI = 'TI',
  TI_ER = 'TI_ER',
  TI_ET = 'TI_ET',
  TK = 'TK',
  TK_TM = 'TK_TM',
  TO = 'TO',
  TO_TO = 'TO_TO',
  TR = 'TR',
  TR_CY = 'TR_CY',
  TR_TR = 'TR_TR',
  TT = 'TT',
  TT_RU = 'TT_RU',
  TWQ = 'TWQ',
  TWQ_NE = 'TWQ_NE',
  TZM = 'TZM',
  TZM_MA = 'TZM_MA',
  UG = 'UG',
  UG_CN = 'UG_CN',
  UK = 'UK',
  UK_UA = 'UK_UA',
  UR = 'UR',
  UR_IN = 'UR_IN',
  UR_PK = 'UR_PK',
  UZ = 'UZ',
  UZ_ARAB = 'UZ_ARAB',
  UZ_ARAB_AF = 'UZ_ARAB_AF',
  UZ_CYRL = 'UZ_CYRL',
  UZ_CYRL_UZ = 'UZ_CYRL_UZ',
  UZ_LATN = 'UZ_LATN',
  UZ_LATN_UZ = 'UZ_LATN_UZ',
  VAI = 'VAI',
  VAI_LATN = 'VAI_LATN',
  VAI_LATN_LR = 'VAI_LATN_LR',
  VAI_VAII = 'VAI_VAII',
  VAI_VAII_LR = 'VAI_VAII_LR',
  VI = 'VI',
  VI_VN = 'VI_VN',
  VO = 'VO',
  VUN = 'VUN',
  VUN_TZ = 'VUN_TZ',
  WAE = 'WAE',
  WAE_CH = 'WAE_CH',
  WO = 'WO',
  WO_SN = 'WO_SN',
  XH = 'XH',
  XH_ZA = 'XH_ZA',
  XOG = 'XOG',
  XOG_UG = 'XOG_UG',
  YAV = 'YAV',
  YAV_CM = 'YAV_CM',
  YI = 'YI',
  YO = 'YO',
  YO_BJ = 'YO_BJ',
  YO_NG = 'YO_NG',
  YUE = 'YUE',
  YUE_HANS = 'YUE_HANS',
  YUE_HANS_CN = 'YUE_HANS_CN',
  YUE_HANT = 'YUE_HANT',
  YUE_HANT_HK = 'YUE_HANT_HK',
  ZGH = 'ZGH',
  ZGH_MA = 'ZGH_MA',
  ZH = 'ZH',
  ZH_HANS = 'ZH_HANS',
  ZH_HANS_CN = 'ZH_HANS_CN',
  ZH_HANS_HK = 'ZH_HANS_HK',
  ZH_HANS_MO = 'ZH_HANS_MO',
  ZH_HANS_SG = 'ZH_HANS_SG',
  ZH_HANT = 'ZH_HANT',
  ZH_HANT_HK = 'ZH_HANT_HK',
  ZH_HANT_MO = 'ZH_HANT_MO',
  ZH_HANT_TW = 'ZH_HANT_TW',
  ZU = 'ZU',
  ZU_ZA = 'ZU_ZA'
}

/** An enumeration. */
export enum MetadataErrorCode {
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INVALID = 'INVALID',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED = 'REQUIRED',
  NOT_UPDATED = 'NOT_UPDATED'
}

export type MetadataFilter = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value?: InputMaybe<Scalars['String']>;
};

export type MetadataInput = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

export enum OrderDirection {
  /** Specifies an ascending sort order. */
  ASC = 'ASC',
  /** Specifies a descending sort order. */
  DESC = 'DESC'
}

/** An enumeration. */
export enum PermissionEnum {
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_STAFF = 'MANAGE_STAFF',
  IMPERSONATE_USER = 'IMPERSONATE_USER',
  MANAGE_APPS = 'MANAGE_APPS',
  MANAGE_OBSERVABILITY = 'MANAGE_OBSERVABILITY',
  MANAGE_INITIATIVES = 'MANAGE_INITIATIVES',
  MANAGE_POLITICAL_ENTITIES = 'MANAGE_POLITICAL_ENTITIES'
}

export type PermissionGroupCreateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: InputMaybe<Array<Scalars['ID']>>;
  /** Group name. */
  name: Scalars['String'];
};

/** An enumeration. */
export enum PermissionGroupErrorCode {
  ASSIGN_NON_STAFF_MEMBER = 'ASSIGN_NON_STAFF_MEMBER',
  DUPLICATED_INPUT_ITEM = 'DUPLICATED_INPUT_ITEM',
  CANNOT_REMOVE_FROM_LAST_GROUP = 'CANNOT_REMOVE_FROM_LAST_GROUP',
  LEFT_NOT_MANAGEABLE_PERMISSION = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  OUT_OF_SCOPE_PERMISSION = 'OUT_OF_SCOPE_PERMISSION',
  OUT_OF_SCOPE_USER = 'OUT_OF_SCOPE_USER',
  REQUIRED = 'REQUIRED',
  UNIQUE = 'UNIQUE'
}

export type PermissionGroupFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
};

export enum PermissionGroupSortField {
  /** Sort permission group accounts by name. */
  NAME = 'NAME'
}

export type PermissionGroupSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort permission group by the selected field. */
  field: PermissionGroupSortField;
};

export type PermissionGroupUpdateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: InputMaybe<Array<Scalars['ID']>>;
  /** Group name. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to unassign from this group. */
  removePermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to unassign from this group. */
  removeUsers?: InputMaybe<Array<Scalars['ID']>>;
};

export type SeoInput = {
  /** SEO title. */
  title?: InputMaybe<Scalars['String']>;
  /** SEO description. */
  description?: InputMaybe<Scalars['String']>;
};

export type StaffCreateInput = {
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: InputMaybe<Array<Scalars['ID']>>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

export enum StaffMemberStatus {
  /** User account has been activated. */
  ACTIVE = 'ACTIVE',
  /** User account has not been activated yet. */
  DEACTIVATED = 'DEACTIVATED'
}

export type StaffUpdateInput = {
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: InputMaybe<Array<Scalars['ID']>>;
  /** List of permission group IDs from which user should be unassigned. */
  removeGroups?: InputMaybe<Array<Scalars['ID']>>;
};

export type StaffUserInput = {
  status?: InputMaybe<StaffMemberStatus>;
  search?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ThumbnailFormatEnum {
  WEBP = 'WEBP'
}

export enum TranslatableKinds {
  INITIATIVE = 'INITIATIVE'
}

/** An enumeration. */
export enum TranslationErrorCode {
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INVALID = 'INVALID',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED = 'REQUIRED'
}

export type TranslationInput = {
  seoTitle?: InputMaybe<Scalars['String']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /**
   * Translated description.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
};

/** An enumeration. */
export enum UploadErrorCode {
  GRAPHQL_ERROR = 'GRAPHQL_ERROR'
}

export type UserCreateInput = {
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

export enum UserSortField {
  /** Sort users by first name. */
  FIRST_NAME = 'FIRST_NAME',
  /** Sort users by last name. */
  LAST_NAME = 'LAST_NAME',
  /** Sort users by email. */
  EMAIL = 'EMAIL',
  /** Sort users by order count. */
  ORDER_COUNT = 'ORDER_COUNT',
  /** Sort users by created at. */
  CREATED_AT = 'CREATED_AT',
  /** Sort users by last modified at. */
  LAST_MODIFIED_AT = 'LAST_MODIFIED_AT'
}

export type UserSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort users by the selected field. */
  field: UserSortField;
};

/** An enumeration. */
export enum VolumeUnitsEnum {
  CUBIC_MILLIMETER = 'CUBIC_MILLIMETER',
  CUBIC_CENTIMETER = 'CUBIC_CENTIMETER',
  CUBIC_DECIMETER = 'CUBIC_DECIMETER',
  CUBIC_METER = 'CUBIC_METER',
  LITER = 'LITER',
  CUBIC_FOOT = 'CUBIC_FOOT',
  CUBIC_INCH = 'CUBIC_INCH',
  CUBIC_YARD = 'CUBIC_YARD',
  QT = 'QT',
  PINT = 'PINT',
  FL_OZ = 'FL_OZ',
  ACRE_IN = 'ACRE_IN',
  ACRE_FT = 'ACRE_FT'
}

export type WebhookCreateInput = {
  /** The name of the webhook. */
  name?: InputMaybe<Scalars['String']>;
  /** The url to receive the payload. */
  targetUrl?: InputMaybe<Scalars['String']>;
  /**
   * The events that webhook wants to subscribe.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `asyncEvents` or `syncEvents` instead.
   */
  events?: InputMaybe<Array<WebhookEventTypeEnum>>;
  /** The asynchronous events that webhook wants to subscribe. */
  asyncEvents?: InputMaybe<Array<WebhookEventTypeAsyncEnum>>;
  /** The synchronous events that webhook wants to subscribe. */
  syncEvents?: InputMaybe<Array<WebhookEventTypeSyncEnum>>;
  /** ID of the app to which webhook belongs. */
  app?: InputMaybe<Scalars['ID']>;
  /** Determine if webhook will be set active or not. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /**
   * The secret key used to create a hash signature with each payload.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. As of Saleor 3.5, webhook payloads default to signing using a verifiable JWS.
   */
  secretKey?: InputMaybe<Scalars['String']>;
  /**
   * Subscription query used to define a webhook payload.
   *
   * Added in Saleor 3.2.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  query?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum WebhookErrorCode {
  GRAPHQL_ERROR = 'GRAPHQL_ERROR',
  INVALID = 'INVALID',
  NOT_FOUND = 'NOT_FOUND',
  REQUIRED = 'REQUIRED',
  UNIQUE = 'UNIQUE'
}

/** Enum determining type of webhook. */
export enum WebhookEventTypeAsyncEnum {
  /** All the events. */
  ANY_EVENTS = 'ANY_EVENTS',
  /** A new app installed. */
  APP_INSTALLED = 'APP_INSTALLED',
  /** An app updated. */
  APP_UPDATED = 'APP_UPDATED',
  /** An app deleted. */
  APP_DELETED = 'APP_DELETED',
  /** An app status is changed. */
  APP_STATUS_CHANGED = 'APP_STATUS_CHANGED',
  /** A new customer account is created. */
  CUSTOMER_CREATED = 'CUSTOMER_CREATED',
  /** A customer account is updated. */
  CUSTOMER_UPDATED = 'CUSTOMER_UPDATED',
  /** A customer account is deleted. */
  CUSTOMER_DELETED = 'CUSTOMER_DELETED',
  INITIATIVE_CREATED = 'INITIATIVE_CREATED',
  INITIATIVE_UPDATED = 'INITIATIVE_UPDATED',
  INITIATIVE_DELETED = 'INITIATIVE_DELETED',
  /** User notification triggered. */
  NOTIFY_USER = 'NOTIFY_USER',
  /** A new page is created. */
  PAGE_CREATED = 'PAGE_CREATED',
  /** A page is updated. */
  PAGE_UPDATED = 'PAGE_UPDATED',
  /** A page is deleted. */
  PAGE_DELETED = 'PAGE_DELETED',
  /** A new page type is created. */
  PAGE_TYPE_CREATED = 'PAGE_TYPE_CREATED',
  /** A page type is updated. */
  PAGE_TYPE_UPDATED = 'PAGE_TYPE_UPDATED',
  /** A page type is deleted. */
  PAGE_TYPE_DELETED = 'PAGE_TYPE_DELETED',
  /** A new permission group is created. */
  PERMISSION_GROUP_CREATED = 'PERMISSION_GROUP_CREATED',
  /** A permission group is updated. */
  PERMISSION_GROUP_UPDATED = 'PERMISSION_GROUP_UPDATED',
  /** A permission group is deleted. */
  PERMISSION_GROUP_DELETED = 'PERMISSION_GROUP_DELETED',
  /** A new staff user is created. */
  STAFF_CREATED = 'STAFF_CREATED',
  /** A staff user is updated. */
  STAFF_UPDATED = 'STAFF_UPDATED',
  /** A staff user is deleted. */
  STAFF_DELETED = 'STAFF_DELETED',
  /** An observability event is created. */
  OBSERVABILITY = 'OBSERVABILITY'
}

/** Enum determining type of webhook. */
export enum WebhookEventTypeEnum {
  /** All the events. */
  ANY_EVENTS = 'ANY_EVENTS',
  /** A new app installed. */
  APP_INSTALLED = 'APP_INSTALLED',
  /** An app updated. */
  APP_UPDATED = 'APP_UPDATED',
  /** An app deleted. */
  APP_DELETED = 'APP_DELETED',
  /** An app status is changed. */
  APP_STATUS_CHANGED = 'APP_STATUS_CHANGED',
  /** A new customer account is created. */
  CUSTOMER_CREATED = 'CUSTOMER_CREATED',
  /** A customer account is updated. */
  CUSTOMER_UPDATED = 'CUSTOMER_UPDATED',
  /** A customer account is deleted. */
  CUSTOMER_DELETED = 'CUSTOMER_DELETED',
  INITIATIVE_CREATED = 'INITIATIVE_CREATED',
  INITIATIVE_UPDATED = 'INITIATIVE_UPDATED',
  INITIATIVE_DELETED = 'INITIATIVE_DELETED',
  /** User notification triggered. */
  NOTIFY_USER = 'NOTIFY_USER',
  /** A new page is created. */
  PAGE_CREATED = 'PAGE_CREATED',
  /** A page is updated. */
  PAGE_UPDATED = 'PAGE_UPDATED',
  /** A page is deleted. */
  PAGE_DELETED = 'PAGE_DELETED',
  /** A new page type is created. */
  PAGE_TYPE_CREATED = 'PAGE_TYPE_CREATED',
  /** A page type is updated. */
  PAGE_TYPE_UPDATED = 'PAGE_TYPE_UPDATED',
  /** A page type is deleted. */
  PAGE_TYPE_DELETED = 'PAGE_TYPE_DELETED',
  /** A new permission group is created. */
  PERMISSION_GROUP_CREATED = 'PERMISSION_GROUP_CREATED',
  /** A permission group is updated. */
  PERMISSION_GROUP_UPDATED = 'PERMISSION_GROUP_UPDATED',
  /** A permission group is deleted. */
  PERMISSION_GROUP_DELETED = 'PERMISSION_GROUP_DELETED',
  /** A new staff user is created. */
  STAFF_CREATED = 'STAFF_CREATED',
  /** A staff user is updated. */
  STAFF_UPDATED = 'STAFF_UPDATED',
  /** A staff user is deleted. */
  STAFF_DELETED = 'STAFF_DELETED',
  /** An observability event is created. */
  OBSERVABILITY = 'OBSERVABILITY',
  EXAMPLE_SYNC_EVENT = 'EXAMPLE_SYNC_EVENT'
}

/** Enum determining type of webhook. */
export enum WebhookEventTypeSyncEnum {
  EXAMPLE_SYNC_EVENT = 'EXAMPLE_SYNC_EVENT'
}

/** An enumeration. */
export enum WebhookSampleEventTypeEnum {
  APP_INSTALLED = 'APP_INSTALLED',
  APP_UPDATED = 'APP_UPDATED',
  APP_DELETED = 'APP_DELETED',
  APP_STATUS_CHANGED = 'APP_STATUS_CHANGED',
  CUSTOMER_CREATED = 'CUSTOMER_CREATED',
  CUSTOMER_UPDATED = 'CUSTOMER_UPDATED',
  CUSTOMER_DELETED = 'CUSTOMER_DELETED',
  INITIATIVE_CREATED = 'INITIATIVE_CREATED',
  INITIATIVE_UPDATED = 'INITIATIVE_UPDATED',
  INITIATIVE_DELETED = 'INITIATIVE_DELETED',
  NOTIFY_USER = 'NOTIFY_USER',
  PAGE_CREATED = 'PAGE_CREATED',
  PAGE_UPDATED = 'PAGE_UPDATED',
  PAGE_DELETED = 'PAGE_DELETED',
  PAGE_TYPE_CREATED = 'PAGE_TYPE_CREATED',
  PAGE_TYPE_UPDATED = 'PAGE_TYPE_UPDATED',
  PAGE_TYPE_DELETED = 'PAGE_TYPE_DELETED',
  PERMISSION_GROUP_CREATED = 'PERMISSION_GROUP_CREATED',
  PERMISSION_GROUP_UPDATED = 'PERMISSION_GROUP_UPDATED',
  PERMISSION_GROUP_DELETED = 'PERMISSION_GROUP_DELETED',
  STAFF_CREATED = 'STAFF_CREATED',
  STAFF_UPDATED = 'STAFF_UPDATED',
  STAFF_DELETED = 'STAFF_DELETED',
  OBSERVABILITY = 'OBSERVABILITY'
}

export type WebhookUpdateInput = {
  /** The new name of the webhook. */
  name?: InputMaybe<Scalars['String']>;
  /** The url to receive the payload. */
  targetUrl?: InputMaybe<Scalars['String']>;
  /**
   * The events that webhook wants to subscribe.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `asyncEvents` or `syncEvents` instead.
   */
  events?: InputMaybe<Array<WebhookEventTypeEnum>>;
  /** The asynchronous events that webhook wants to subscribe. */
  asyncEvents?: InputMaybe<Array<WebhookEventTypeAsyncEnum>>;
  /** The synchronous events that webhook wants to subscribe. */
  syncEvents?: InputMaybe<Array<WebhookEventTypeSyncEnum>>;
  /** ID of the app to which webhook belongs. */
  app?: InputMaybe<Scalars['ID']>;
  /** Determine if webhook will be set active or not. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /**
   * Use to create a hash signature with each payload.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. As of Saleor 3.5, webhook payloads default to signing using a verifiable JWS.
   */
  secretKey?: InputMaybe<Scalars['String']>;
  /**
   * Subscription query used to define a webhook payload.
   *
   * Added in Saleor 3.2.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  query?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum WeightUnitsEnum {
  G = 'G',
  LB = 'LB',
  OZ = 'OZ',
  KG = 'KG',
  TONNE = 'TONNE'
}

export type AppCreateMutationVariables = Exact<{
  input: AppInput;
}>;


export type AppCreateMutation = { __typename: 'Mutation', appCreate: { __typename: 'AppCreate', authToken: string | null, app: { __typename: 'App', id: string, name: string | null, created: any | null, isActive: boolean | null, type: AppTypeEnum | null, homepageUrl: string | null, appUrl: string | null, manifestUrl: string | null, configurationUrl: string | null, supportUrl: string | null, version: string | null, accessToken: string | null, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, tokens: Array<{ __typename: 'AppToken', authToken: string | null, id: string, name: string | null }> | null, webhooks: Array<{ __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } }> | null } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppDeleteMutation = { __typename: 'Mutation', appDelete: { __typename: 'AppDelete', app: { __typename: 'App', id: string, name: string | null, created: any | null, isActive: boolean | null, type: AppTypeEnum | null, homepageUrl: string | null, appUrl: string | null, manifestUrl: string | null, configurationUrl: string | null, supportUrl: string | null, version: string | null, accessToken: string | null, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, tokens: Array<{ __typename: 'AppToken', authToken: string | null, id: string, name: string | null }> | null, webhooks: Array<{ __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } }> | null } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppDeleteFailedInstallationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppDeleteFailedInstallationMutation = { __typename: 'Mutation', appDeleteFailedInstallation: { __typename: 'AppDeleteFailedInstallation', appInstallation: { __typename: 'AppInstallation', id: string, status: JobStatusEnum, appName: string, message: string | null } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppFetchMutationVariables = Exact<{
  manifestUrl: Scalars['String'];
}>;


export type AppFetchMutation = { __typename: 'Mutation', appFetchManifest: { __typename: 'AppFetchManifest', manifest: { __typename: 'Manifest', identifier: string, version: string, about: string | null, name: string, appUrl: string | null, configurationUrl: string | null, tokenTargetUrl: string | null, dataPrivacy: string | null, dataPrivacyUrl: string | null, homepageUrl: string | null, supportUrl: string | null, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppInstallMutationVariables = Exact<{
  input: AppInstallInput;
}>;


export type AppInstallMutation = { __typename: 'Mutation', appInstall: { __typename: 'AppInstall', appInstallation: { __typename: 'AppInstallation', id: string, status: JobStatusEnum, appName: string, manifestUrl: string } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppRetryInstallMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppRetryInstallMutation = { __typename: 'Mutation', appRetryInstall: { __typename: 'AppRetryInstall', appInstallation: { __typename: 'AppInstallation', id: string, status: JobStatusEnum, appName: string, manifestUrl: string } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AppInput;
}>;


export type AppUpdateMutation = { __typename: 'Mutation', appUpdate: { __typename: 'AppUpdate', app: { __typename: 'App', id: string, name: string | null, created: any | null, isActive: boolean | null, type: AppTypeEnum | null, homepageUrl: string | null, appUrl: string | null, manifestUrl: string | null, configurationUrl: string | null, supportUrl: string | null, version: string | null, accessToken: string | null, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, tokens: Array<{ __typename: 'AppToken', authToken: string | null, id: string, name: string | null }> | null, webhooks: Array<{ __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } }> | null } | null, errors: Array<{ __typename: 'AppError', message: string | null, permissions: Array<PermissionEnum> | null, field: string | null, code: AppErrorCode }> } | null };

export type AppTokenCreateMutationVariables = Exact<{
  input: AppTokenInput;
}>;


export type AppTokenCreateMutation = { __typename: 'Mutation', appTokenCreate: { __typename: 'AppTokenCreate', authToken: string | null, appToken: { __typename: 'AppToken', name: string | null, authToken: string | null, id: string } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppTokenDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppTokenDeleteMutation = { __typename: 'Mutation', appTokenDelete: { __typename: 'AppTokenDelete', appToken: { __typename: 'AppToken', name: string | null, authToken: string | null, id: string } | null, errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppActivateMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppActivateMutation = { __typename: 'Mutation', appActivate: { __typename: 'AppActivate', errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppDeactivateMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppDeactivateMutation = { __typename: 'Mutation', appDeactivate: { __typename: 'AppDeactivate', errors: Array<{ __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null }> } | null };

export type AppsListQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<AppSortingInput>;
  filter?: InputMaybe<AppFilterInput>;
}>;


export type AppsListQuery = { __typename: 'Query', apps: { __typename: 'AppCountableConnection', totalCount: number | null, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, endCursor: string | null }, edges: Array<{ __typename: 'AppCountableEdge', node: { __typename: 'App', id: string, name: string | null, isActive: boolean | null, type: AppTypeEnum | null, appUrl: string | null, manifestUrl: string | null, permissions: Array<{ __typename: 'Permission', name: string, code: PermissionEnum }> | null } }> } | null };

export type AppsInstallationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppsInstallationsQuery = { __typename: 'Query', appsInstallations: Array<{ __typename: 'AppInstallation', status: JobStatusEnum, message: string | null, appName: string, manifestUrl: string, id: string }> };

export type AppQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppQuery = { __typename: 'Query', app: { __typename: 'App', aboutApp: string | null, dataPrivacy: string | null, dataPrivacyUrl: string | null, id: string, name: string | null, created: any | null, isActive: boolean | null, type: AppTypeEnum | null, homepageUrl: string | null, appUrl: string | null, manifestUrl: string | null, configurationUrl: string | null, supportUrl: string | null, version: string | null, accessToken: string | null, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, tokens: Array<{ __typename: 'AppToken', authToken: string | null, id: string, name: string | null }> | null, webhooks: Array<{ __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } }> | null } | null };

export type ExtensionListQueryVariables = Exact<{
  filter: AppExtensionFilterInput;
}>;


export type ExtensionListQuery = { __typename: 'Query', appExtensions: { __typename: 'AppExtensionCountableConnection', edges: Array<{ __typename: 'AppExtensionCountableEdge', node: { __typename: 'AppExtension', id: string, label: string, url: string, mount: AppExtensionMountEnum, target: AppExtensionTargetEnum, accessToken: string | null, permissions: Array<{ __typename: 'Permission', code: PermissionEnum }>, app: { __typename: 'App', id: string, appUrl: string | null } } }> } | null };

export type UserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailsQuery = { __typename: 'Query', me: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, name: string }> | null, avatar: { __typename: 'Image', url: string } | null } | null };

export type SearchCatalogQueryVariables = Exact<{
  first: Scalars['Int'];
  query: Scalars['String'];
}>;


export type SearchCatalogQuery = { __typename: 'Query', initiatives: { __typename: 'InitiativeCountableConnection', edges: Array<{ __typename: 'InitiativeCountableEdge', node: { __typename: 'Initiative', id: string, title: string } }> } | null };

export type UpdateCustomerMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CustomerInput;
}>;


export type UpdateCustomerMutation = { __typename: 'Mutation', customerUpdate: { __typename: 'CustomerUpdate', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', dateJoined: any, lastLogin: any | null, note: string | null, isActive: boolean, id: string, email: string, firstName: string, lastName: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type CreateCustomerMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type CreateCustomerMutation = { __typename: 'Mutation', customerCreate: { __typename: 'CustomerCreate', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string } | null } | null };

export type RemoveCustomerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveCustomerMutation = { __typename: 'Mutation', customerDelete: { __typename: 'CustomerDelete', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type BulkRemoveCustomersMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type BulkRemoveCustomersMutation = { __typename: 'Mutation', customerBulkDelete: { __typename: 'CustomerBulkDelete', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type FileUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type FileUploadMutation = { __typename: 'Mutation', fileUpload: { __typename: 'FileUpload', uploadedFile: { __typename: 'File', url: string, contentType: string | null } | null, errors: Array<{ __typename: 'UploadError', code: UploadErrorCode, field: string | null, message: string | null }> } | null };

export type AppFragment = { __typename: 'App', id: string, name: string | null, created: any | null, isActive: boolean | null, type: AppTypeEnum | null, homepageUrl: string | null, appUrl: string | null, manifestUrl: string | null, configurationUrl: string | null, supportUrl: string | null, version: string | null, accessToken: string | null, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, tokens: Array<{ __typename: 'AppToken', authToken: string | null, id: string, name: string | null }> | null, webhooks: Array<{ __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } }> | null };

export type AppListItemFragment = { __typename: 'App', id: string, name: string | null, isActive: boolean | null, type: AppTypeEnum | null, appUrl: string | null, manifestUrl: string | null, permissions: Array<{ __typename: 'Permission', name: string, code: PermissionEnum }> | null };

export type AppPermissionFragment = { __typename: 'Permission', name: string, code: PermissionEnum };

export type UserPermissionFragment = { __typename: 'UserPermission', code: PermissionEnum, name: string };

export type UserFragment = { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, name: string }> | null, avatar: { __typename: 'Image', url: string } | null };

export type UserBaseFragment = { __typename: 'User', id: string, firstName: string, lastName: string };

export type AccountErrorFragmentFragment = { __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null };

export type UserBaseFragmentFragment = { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean };

export type UserDetailsFragmentFragment = { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> };

export type CustomerFragment = { __typename: 'User', id: string, email: string, firstName: string, lastName: string };

export type CustomerDetailsFragment = { __typename: 'User', dateJoined: any, lastLogin: any | null, note: string | null, isActive: boolean, id: string, email: string, firstName: string, lastName: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> };

export type InitiativeErrorFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type AccountErrorFragment = { __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null };

export type PermissionGroupErrorFragment = { __typename: 'PermissionGroupError', code: PermissionGroupErrorCode, field: string | null, message: string | null };

export type StaffErrorFragment = { __typename: 'StaffError', code: AccountErrorCode, field: string | null, message: string | null };

export type WebhookErrorFragment = { __typename: 'WebhookError', code: WebhookErrorCode, field: string | null, message: string | null };

export type AppErrorFragment = { __typename: 'AppError', field: string | null, message: string | null, code: AppErrorCode, permissions: Array<PermissionEnum> | null };

export type ExportErrorFragment = { __typename: 'ExportError', code: ExportErrorCode, field: string | null, message: string | null };

export type MetadataErrorFragment = { __typename: 'MetadataError', code: MetadataErrorCode, field: string | null, message: string | null };

export type UploadErrorFragment = { __typename: 'UploadError', code: UploadErrorCode, field: string | null, message: string | null };

export type InitiativeTypeDeleteErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeTypeBulkDeleteErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeTypeBulkUpdateErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeAttributeAssignErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeAttributeUnassignErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeTypeCreateErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeTypeReorderAttributesErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null };

export type InitiativeAttributeAssignmentUpdateErrorFragmentFragment = { __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null, attributes: Array<string> | null };

export type InitiativeTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type InitiativeVariantTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type CategoryTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type CollectionTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type PageTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type VoucherTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type SaleTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type AttributeTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type AttributeValueTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type ShippingPriceTranslateErrorFragmentFragment = { __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null };

export type FileFragment = { __typename: 'File', url: string, contentType: string | null };

export type InitiativeMediaFragment = { __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string, type: InitiativeMediaType, oembedData: any };

export type InitiativeWithChannelListingsFragment = { __typename: 'Initiative', id: string, title: string, thumbnail: { __typename: 'Image', url: string } | null };

export type InitiativeFragment = { __typename: 'Initiative', title: string, slug: string, description: any | null, seoTitle: string | null, seoDescription: string | null, media: Array<{ __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string, type: InitiativeMediaType, oembedData: any }> | null, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> };

export type ExportFileFragment = { __typename: 'ExportFile', id: string, status: JobStatusEnum, url: string | null };

export type MetadataItemFragment = { __typename: 'MetadataItem', key: string, value: string };

type Metadata_App_Fragment = { __typename: 'App', metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> };

type Metadata_Initiative_Fragment = { __typename: 'Initiative', metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> };

type Metadata_User_Fragment = { __typename: 'User', metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> };

export type MetadataFragment = Metadata_App_Fragment | Metadata_Initiative_Fragment | Metadata_User_Fragment;

export type PermissionGroupFragment = { __typename: 'Group', id: string, name: string, userCanManage: boolean, users: Array<{ __typename: 'User', id: string, firstName: string, lastName: string }> | null };

export type PermissionFragment = { __typename: 'Permission', code: PermissionEnum, name: string };

export type PermissionGroupMemberFragment = { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string, avatar: { __typename: 'Image', url: string } | null };

export type PermissionGroupDetailsFragment = { __typename: 'Group', id: string, name: string, userCanManage: boolean, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null, users: Array<{ __typename: 'User', id: string, firstName: string, lastName: string, email: string, isActive: boolean, avatar: { __typename: 'Image', url: string } | null }> | null };

export type StaffMemberFragment = { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string };

export type StaffMemberDetailsFragment = { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string, permissionGroups: Array<{ __typename: 'Group', id: string, name: string, userCanManage: boolean }> | null, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, name: string }> | null, avatar: { __typename: 'Image', url: string } | null };

export type InitiativeTranslationFragment = { __typename: 'InitiativeTranslatableContent', initiative: { __typename: 'Initiative', id: string, title: string, description: any | null, seoDescription: string | null, seoTitle: string | null } | null, translation: { __typename: 'InitiativeTranslation', id: string, seoTitle: string | null, seoDescription: string | null, title: string | null, description: any | null, language: { __typename: 'LanguageDisplay', code: LanguageCodeEnum, language: string } } | null };

export type WebhookFragment = { __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } };

export type WebhooksDetailsFragment = { __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } };

export type InitiativeMediaCreateMutationVariables = Exact<{
  initiative: Scalars['ID'];
  image?: InputMaybe<Scalars['Upload']>;
  alt?: InputMaybe<Scalars['String']>;
  mediaUrl?: InputMaybe<Scalars['String']>;
}>;


export type InitiativeMediaCreateMutation = { __typename: 'Mutation', initiativeMediaCreate: { __typename: 'InitiativeMediaCreate', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string, media: Array<{ __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string, type: InitiativeMediaType, oembedData: any }> | null } | null } | null };

export type InitiativeDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type InitiativeDeleteMutation = { __typename: 'Mutation', initiativeDelete: { __typename: 'InitiativeDelete', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string } | null } | null };

export type InitiativeMediaReorderMutationVariables = Exact<{
  initiativeId: Scalars['ID'];
  mediaIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type InitiativeMediaReorderMutation = { __typename: 'Mutation', initiativeMediaReorder: { __typename: 'InitiativeMediaReorder', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string, media: Array<{ __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string }> | null } | null } | null };

export type InitiativeUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: InitiativeInput;
}>;


export type InitiativeUpdateMutation = { __typename: 'Mutation', initiativeUpdate: { __typename: 'InitiativeUpdate', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }> } | null };

export type InitiativeCreateMutationVariables = Exact<{
  input: InitiativeCreateInput;
}>;


export type InitiativeCreateMutation = { __typename: 'Mutation', initiativeCreate: { __typename: 'InitiativeCreate', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string } | null } | null };

export type InitiativeMediaDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type InitiativeMediaDeleteMutation = { __typename: 'Mutation', initiativeMediaDelete: { __typename: 'InitiativeMediaDelete', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string, media: Array<{ __typename: 'InitiativeMedia', id: string }> | null } | null } | null };

export type InitiativeMediaUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  alt: Scalars['String'];
}>;


export type InitiativeMediaUpdateMutation = { __typename: 'Mutation', initiativeMediaUpdate: { __typename: 'InitiativeMediaUpdate', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string, media: Array<{ __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string, type: InitiativeMediaType, oembedData: any }> | null } | null } | null };

export type InitiativeBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type InitiativeBulkDeleteMutation = { __typename: 'Mutation', initiativeBulkDelete: { __typename: 'InitiativeBulkDelete', errors: Array<{ __typename: 'InitiativeError', code: InitiativeErrorCode, field: string | null, message: string | null }> } | null };

export type InitiativeExportMutationVariables = Exact<{
  input: ExportInitiativesInput;
}>;


export type InitiativeExportMutation = { __typename: 'Mutation', exportInitiatives: { __typename: 'ExportInitiatives', exportFile: { __typename: 'ExportFile', id: string, status: JobStatusEnum, url: string | null } | null, errors: Array<{ __typename: 'ExportError', code: ExportErrorCode, field: string | null, message: string | null }> } | null };

export type InitiativeListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<InitiativeFilterInput>;
  sort?: InputMaybe<InitiativeOrder>;
}>;


export type InitiativeListQuery = { __typename: 'Query', initiatives: { __typename: 'InitiativeCountableConnection', totalCount: number | null, edges: Array<{ __typename: 'InitiativeCountableEdge', node: { __typename: 'Initiative', updatedAt: any, title: string, slug: string, description: any | null, seoTitle: string | null, seoDescription: string | null, media: Array<{ __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string, type: InitiativeMediaType, oembedData: any }> | null, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } }>, pageInfo: { __typename: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor: string | null, endCursor: string | null } } | null };

export type InitiativeCountQueryVariables = Exact<{
  filter?: InputMaybe<InitiativeFilterInput>;
}>;


export type InitiativeCountQuery = { __typename: 'Query', initiatives: { __typename: 'InitiativeCountableConnection', totalCount: number | null } | null };

export type InitiativeDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  firstValues?: InputMaybe<Scalars['Int']>;
  afterValues?: InputMaybe<Scalars['String']>;
  lastValues?: InputMaybe<Scalars['Int']>;
  beforeValues?: InputMaybe<Scalars['String']>;
}>;


export type InitiativeDetailsQuery = { __typename: 'Query', initiative: { __typename: 'Initiative', title: string, slug: string, description: any | null, seoTitle: string | null, seoDescription: string | null, media: Array<{ __typename: 'InitiativeMedia', id: string, alt: string, sortOrder: number | null, url: string, type: InitiativeMediaType, oembedData: any }> | null, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null };

export type InitiativeMediaByIdQueryVariables = Exact<{
  initiativeId: Scalars['ID'];
  mediaId: Scalars['ID'];
}>;


export type InitiativeMediaByIdQuery = { __typename: 'Query', initiative: { __typename: 'Initiative', id: string, title: string, mainImage: { __typename: 'InitiativeMedia', id: string, alt: string, url: string, type: InitiativeMediaType, oembedData: any } | null, media: Array<{ __typename: 'InitiativeMedia', id: string, url: string, alt: string, type: InitiativeMediaType, oembedData: any }> | null } | null };

export type PermissionGroupDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PermissionGroupDeleteMutation = { __typename: 'Mutation', permissionGroupDelete: { __typename: 'PermissionGroupDelete', errors: Array<{ __typename: 'PermissionGroupError', code: PermissionGroupErrorCode, field: string | null, message: string | null }> } | null };

export type PermissionGroupCreateMutationVariables = Exact<{
  input: PermissionGroupCreateInput;
}>;


export type PermissionGroupCreateMutation = { __typename: 'Mutation', permissionGroupCreate: { __typename: 'PermissionGroupCreate', errors: Array<{ __typename: 'PermissionGroupError', code: PermissionGroupErrorCode, field: string | null, message: string | null }>, group: { __typename: 'Group', id: string, name: string, userCanManage: boolean, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null, users: Array<{ __typename: 'User', id: string, firstName: string, lastName: string, email: string, isActive: boolean, avatar: { __typename: 'Image', url: string } | null }> | null } | null } | null };

export type PermissionGroupUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: PermissionGroupUpdateInput;
}>;


export type PermissionGroupUpdateMutation = { __typename: 'Mutation', permissionGroupUpdate: { __typename: 'PermissionGroupUpdate', errors: Array<{ __typename: 'PermissionGroupError', code: PermissionGroupErrorCode, field: string | null, message: string | null }>, group: { __typename: 'Group', id: string, name: string, userCanManage: boolean, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null, users: Array<{ __typename: 'User', id: string, firstName: string, lastName: string, email: string, isActive: boolean, avatar: { __typename: 'Image', url: string } | null }> | null } | null } | null };

export type PermissionGroupListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<PermissionGroupFilterInput>;
  sort?: InputMaybe<PermissionGroupSortingInput>;
}>;


export type PermissionGroupListQuery = { __typename: 'Query', permissionGroups: { __typename: 'GroupCountableConnection', edges: Array<{ __typename: 'GroupCountableEdge', node: { __typename: 'Group', id: string, name: string, userCanManage: boolean, users: Array<{ __typename: 'User', id: string, firstName: string, lastName: string }> | null } }> } | null };

export type PermissionGroupDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type PermissionGroupDetailsQuery = { __typename: 'Query', permissionGroup: { __typename: 'Group', id: string, name: string, userCanManage: boolean, permissions: Array<{ __typename: 'Permission', code: PermissionEnum, name: string }> | null, users: Array<{ __typename: 'User', id: string, firstName: string, lastName: string, email: string, isActive: boolean, avatar: { __typename: 'Image', url: string } | null }> | null } | null, user: { __typename: 'User', editableGroups: Array<{ __typename: 'Group', id: string }> | null, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, sourcePermissionGroups: Array<{ __typename: 'Group', id: string }> | null }> | null } | null };

export type LoginWithoutDetailsMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginWithoutDetailsMutation = { __typename: 'Mutation', tokenCreate: { __typename: 'CreateToken', csrfToken: string | null, token: string | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean } | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename: 'Mutation', tokenCreate: { __typename: 'CreateToken', csrfToken: string | null, token: string | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type RegisterMutationVariables = Exact<{
  input: AccountRegisterInput;
}>;


export type RegisterMutation = { __typename: 'Mutation', accountRegister: { __typename: 'AccountRegister', requiresConfirmation: boolean | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type RefreshTokenMutationVariables = Exact<{
  csrfToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename: 'Mutation', tokenRefresh: { __typename: 'RefreshToken', token: string | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type RefreshTokenWithUserMutationVariables = Exact<{
  csrfToken: Scalars['String'];
}>;


export type RefreshTokenWithUserMutation = { __typename: 'Mutation', tokenRefresh: { __typename: 'RefreshToken', token: string | null, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyTokenMutation = { __typename: 'Mutation', tokenVerify: { __typename: 'VerifyToken', isValid: boolean, payload: any | null, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type PasswordChangeMutationVariables = Exact<{
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
}>;


export type PasswordChangeMutation = { __typename: 'Mutation', passwordChange: { __typename: 'PasswordChange', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
  redirectUrl: Scalars['String'];
  channel: Scalars['String'];
}>;


export type RequestPasswordResetMutation = { __typename: 'Mutation', requestPasswordReset: { __typename: 'RequestPasswordReset', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type SetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SetPasswordMutation = { __typename: 'Mutation', setPassword: { __typename: 'SetPassword', token: string | null, csrfToken: string | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type RequestEmailChangeMutationVariables = Exact<{
  channel: Scalars['String'];
  newEmail: Scalars['String'];
  password: Scalars['String'];
  redirectUrl: Scalars['String'];
}>;


export type RequestEmailChangeMutation = { __typename: 'Mutation', requestEmailChange: { __typename: 'RequestEmailChange', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type ConfirmEmailChangeMutationVariables = Exact<{
  channel: Scalars['String'];
  token: Scalars['String'];
}>;


export type ConfirmEmailChangeMutation = { __typename: 'Mutation', confirmEmailChange: { __typename: 'ConfirmEmailChange', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type AccountRequestDeletionMutationVariables = Exact<{
  channel: Scalars['String'];
  redirectUrl: Scalars['String'];
}>;


export type AccountRequestDeletionMutation = { __typename: 'Mutation', accountRequestDeletion: { __typename: 'AccountRequestDeletion', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type AccountDeleteMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AccountDeleteMutation = { __typename: 'Mutation', accountDelete: { __typename: 'AccountDelete', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type AccountUpdateMutationVariables = Exact<{
  input: AccountInput;
}>;


export type AccountUpdateMutation = { __typename: 'Mutation', accountUpdate: { __typename: 'AccountUpdate', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type AccountConfirmMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
}>;


export type AccountConfirmMutation = { __typename: 'Mutation', confirmAccount: { __typename: 'ConfirmAccount', user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null, errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type UserWithoutDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserWithoutDetailsQuery = { __typename: 'Query', user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename: 'Query', user: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null };

export type SearchInitiativesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
}>;


export type SearchInitiativesQuery = { __typename: 'Query', search: { __typename: 'InitiativeCountableConnection', edges: Array<{ __typename: 'InitiativeCountableEdge', node: { __typename: 'Initiative', id: string, title: string, thumbnail: { __typename: 'Image', url: string } | null } }> } | null };

export type SearchPermissionGroupsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
}>;


export type SearchPermissionGroupsQuery = { __typename: 'Query', search: { __typename: 'GroupCountableConnection', edges: Array<{ __typename: 'GroupCountableEdge', node: { __typename: 'Group', id: string, name: string, userCanManage: boolean } }> } | null };

export type SearchStaffMembersQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
}>;


export type SearchStaffMembersQuery = { __typename: 'Query', search: { __typename: 'UserCountableConnection', edges: Array<{ __typename: 'UserCountableEdge', node: { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isActive: boolean, avatar: { __typename: 'Image', alt: string | null, url: string } | null } }> } | null };

export type StaffMemberAddMutationVariables = Exact<{
  input: StaffCreateInput;
}>;


export type StaffMemberAddMutation = { __typename: 'Mutation', staffCreate: { __typename: 'StaffCreate', errors: Array<{ __typename: 'StaffError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string, permissionGroups: Array<{ __typename: 'Group', id: string, name: string, userCanManage: boolean }> | null, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, name: string }> | null, avatar: { __typename: 'Image', url: string } | null } | null } | null };

export type StaffMemberUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: StaffUpdateInput;
}>;


export type StaffMemberUpdateMutation = { __typename: 'Mutation', staffUpdate: { __typename: 'StaffUpdate', errors: Array<{ __typename: 'StaffError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string, permissionGroups: Array<{ __typename: 'Group', id: string, name: string, userCanManage: boolean }> | null, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, name: string }> | null, avatar: { __typename: 'Image', url: string } | null } | null } | null };

export type StaffMemberDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StaffMemberDeleteMutation = { __typename: 'Mutation', staffDelete: { __typename: 'StaffDelete', errors: Array<{ __typename: 'StaffError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type StaffAvatarUpdateMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;


export type StaffAvatarUpdateMutation = { __typename: 'Mutation', userAvatarUpdate: { __typename: 'UserAvatarUpdate', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, avatar: { __typename: 'Image', url: string } | null } | null } | null };

export type StaffAvatarDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type StaffAvatarDeleteMutation = { __typename: 'Mutation', userAvatarDelete: { __typename: 'UserAvatarDelete', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }>, user: { __typename: 'User', id: string, avatar: { __typename: 'Image', url: string } | null } | null } | null };

export type ChangeStaffPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
}>;


export type ChangeStaffPasswordMutation = { __typename: 'Mutation', passwordChange: { __typename: 'PasswordChange', errors: Array<{ __typename: 'AccountError', code: AccountErrorCode, field: string | null, message: string | null }> } | null };

export type StaffListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<StaffUserInput>;
  sort?: InputMaybe<UserSortingInput>;
}>;


export type StaffListQuery = { __typename: 'Query', staffUsers: { __typename: 'UserCountableConnection', edges: Array<{ __typename: 'UserCountableEdge', cursor: string, node: { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string, avatar: { __typename: 'Image', url: string } | null } }>, pageInfo: { __typename: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor: string | null, endCursor: string | null } } | null };

export type StaffMemberDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StaffMemberDetailsQuery = { __typename: 'Query', user: { __typename: 'User', id: string, email: string, firstName: string, isActive: boolean, lastName: string, permissionGroups: Array<{ __typename: 'Group', id: string, name: string, userCanManage: boolean }> | null, userPermissions: Array<{ __typename: 'UserPermission', code: PermissionEnum, name: string }> | null, avatar: { __typename: 'Image', url: string } | null } | null };

export type UpdateInitiativeTranslationsMutationVariables = Exact<{
  id: Scalars['ID'];
  input: TranslationInput;
  language: LanguageCodeEnum;
}>;


export type UpdateInitiativeTranslationsMutation = { __typename: 'Mutation', initiativeTranslate: { __typename: 'InitiativeTranslate', errors: Array<{ __typename: 'TranslationError', code: TranslationErrorCode, field: string | null, message: string | null }>, initiative: { __typename: 'Initiative', id: string, title: string, description: any | null, seoDescription: string | null, seoTitle: string | null, translation: { __typename: 'InitiativeTranslation', id: string, description: any | null, title: string | null, seoDescription: string | null, seoTitle: string | null, language: { __typename: 'LanguageDisplay', code: LanguageCodeEnum, language: string } } | null } | null } | null };

export type InitiativeTranslationsQueryVariables = Exact<{
  language: LanguageCodeEnum;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type InitiativeTranslationsQuery = { __typename: 'Query', translations: { __typename: 'TranslatableItemConnection', edges: Array<{ __typename: 'TranslatableItemEdge', node: { __typename: 'InitiativeTranslatableContent', initiative: { __typename: 'Initiative', id: string, title: string, description: any | null, seoDescription: string | null, seoTitle: string | null } | null, translation: { __typename: 'InitiativeTranslation', id: string, seoTitle: string | null, seoDescription: string | null, title: string | null, description: any | null, language: { __typename: 'LanguageDisplay', code: LanguageCodeEnum, language: string } } | null } }> } | null };

export type InitiativeTranslationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  language: LanguageCodeEnum;
}>;


export type InitiativeTranslationDetailsQuery = { __typename: 'Query', translation: { __typename: 'InitiativeTranslatableContent', initiative: { __typename: 'Initiative', id: string, title: string, description: any | null, seoDescription: string | null, seoTitle: string | null } | null, translation: { __typename: 'InitiativeTranslation', id: string, seoTitle: string | null, seoDescription: string | null, title: string | null, description: any | null, language: { __typename: 'LanguageDisplay', code: LanguageCodeEnum, language: string } } | null } | null };

export type UpdateMetadataMutationVariables = Exact<{
  id: Scalars['ID'];
  input: Array<MetadataInput> | MetadataInput;
  keysToDelete: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateMetadataMutation = { __typename: 'Mutation', updateMetadata: { __typename: 'UpdateMetadata', errors: Array<{ __typename: 'MetadataError', code: MetadataErrorCode, field: string | null, message: string | null }>, item: { __typename: 'App', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'Initiative', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'User', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null, deleteMetadata: { __typename: 'DeleteMetadata', errors: Array<{ __typename: 'MetadataError', code: MetadataErrorCode, field: string | null, message: string | null }>, item: { __typename: 'App', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'Initiative', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'User', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type UpdatePrivateMetadataMutationVariables = Exact<{
  id: Scalars['ID'];
  input: Array<MetadataInput> | MetadataInput;
  keysToDelete: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdatePrivateMetadataMutation = { __typename: 'Mutation', updatePrivateMetadata: { __typename: 'UpdatePrivateMetadata', errors: Array<{ __typename: 'MetadataError', code: MetadataErrorCode, field: string | null, message: string | null }>, item: { __typename: 'App', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'Initiative', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'User', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null, deletePrivateMetadata: { __typename: 'DeletePrivateMetadata', errors: Array<{ __typename: 'MetadataError', code: MetadataErrorCode, field: string | null, message: string | null }>, item: { __typename: 'App', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'Initiative', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | { __typename: 'User', id: string, metadata: Array<{ __typename: 'MetadataItem', key: string, value: string }>, privateMetadata: Array<{ __typename: 'MetadataItem', key: string, value: string }> } | null } | null };

export type WebhookCreateMutationVariables = Exact<{
  input: WebhookCreateInput;
}>;


export type WebhookCreateMutation = { __typename: 'Mutation', webhookCreate: { __typename: 'WebhookCreate', errors: Array<{ __typename: 'WebhookError', code: WebhookErrorCode, field: string | null, message: string | null }>, webhook: { __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } } | null } | null };

export type WebhookUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: WebhookUpdateInput;
}>;


export type WebhookUpdateMutation = { __typename: 'Mutation', webhookUpdate: { __typename: 'WebhookUpdate', errors: Array<{ __typename: 'WebhookError', code: WebhookErrorCode, field: string | null, message: string | null }>, webhook: { __typename: 'Webhook', id: string, name: string, isActive: boolean, app: { __typename: 'App', id: string, name: string | null } } | null } | null };

export type WebhookDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WebhookDeleteMutation = { __typename: 'Mutation', webhookDelete: { __typename: 'WebhookDelete', errors: Array<{ __typename: 'WebhookError', code: WebhookErrorCode, field: string | null, message: string | null }> } | null };

export type WebhookDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WebhookDetailsQuery = { __typename: 'Query', webhook: { __typename: 'Webhook', secretKey: string | null, targetUrl: string, id: string, name: string, isActive: boolean, syncEvents: Array<{ __typename: 'WebhookEventSync', eventType: WebhookEventTypeSyncEnum }>, asyncEvents: Array<{ __typename: 'WebhookEventAsync', eventType: WebhookEventTypeAsyncEnum }>, app: { __typename: 'App', id: string, name: string | null } } | null };
