/* eslint-disable */

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Event": [
      "AppDeleted",
      "AppInstalled",
      "AppStatusChanged",
      "AppUpdated",
      "InitiativeCreated",
      "InitiativeDeleted",
      "InitiativeUpdated",
      "PermissionGroupCreated",
      "PermissionGroupDeleted",
      "PermissionGroupUpdated",
      "TranslationCreated",
      "TranslationUpdated"
    ],
    "IssuingPrincipal": [
      "App",
      "User"
    ],
    "Job": [
      "AppInstallation"
    ],
    "Node": [
      "App",
      "AppExtension",
      "AppInstallation",
      "AppToken",
      "CustomerEvent",
      "EventDelivery",
      "EventDeliveryAttempt",
      "Group",
      "Initiative",
      "InitiativeMedia",
      "InitiativeTranslatableContent",
      "InitiativeTranslation",
      "User",
      "Webhook"
    ],
    "ObjectWithMetadata": [
      "App",
      "Initiative",
      "User"
    ],
    "TranslatableItem": [
      "InitiativeTranslatableContent"
    ],
    "TranslationTypes": [
      "InitiativeTranslation"
    ],
    "_Entity": [
      "App",
      "User",
      "Group"
    ]
  }
};
      export default result;
