/* eslint-disable */
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountDeleteKeySpecifier = ('accountErrors' | 'errors' | 'user' | AccountDeleteKeySpecifier)[];
export type AccountDeleteFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountErrorKeySpecifier = ('code' | 'field' | 'message' | AccountErrorKeySpecifier)[];
export type AccountErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountRegisterKeySpecifier = ('accountErrors' | 'errors' | 'requiresConfirmation' | 'user' | AccountRegisterKeySpecifier)[];
export type AccountRegisterFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	requiresConfirmation?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountRequestDeletionKeySpecifier = ('accountErrors' | 'errors' | AccountRequestDeletionKeySpecifier)[];
export type AccountRequestDeletionFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountUpdateKeySpecifier = ('accountErrors' | 'errors' | 'user' | AccountUpdateKeySpecifier)[];
export type AccountUpdateFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressValidationDataKeySpecifier = ('addressFormat' | 'addressLatinFormat' | 'allowedFields' | 'cityAreaChoices' | 'cityAreaType' | 'cityChoices' | 'cityType' | 'countryAreaChoices' | 'countryAreaType' | 'countryCode' | 'countryName' | 'postalCodeExamples' | 'postalCodeMatchers' | 'postalCodePrefix' | 'postalCodeType' | 'requiredFields' | 'upperFields' | AddressValidationDataKeySpecifier)[];
export type AddressValidationDataFieldPolicy = {
	addressFormat?: FieldPolicy<any> | FieldReadFunction<any>,
	addressLatinFormat?: FieldPolicy<any> | FieldReadFunction<any>,
	allowedFields?: FieldPolicy<any> | FieldReadFunction<any>,
	cityAreaChoices?: FieldPolicy<any> | FieldReadFunction<any>,
	cityAreaType?: FieldPolicy<any> | FieldReadFunction<any>,
	cityChoices?: FieldPolicy<any> | FieldReadFunction<any>,
	cityType?: FieldPolicy<any> | FieldReadFunction<any>,
	countryAreaChoices?: FieldPolicy<any> | FieldReadFunction<any>,
	countryAreaType?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	countryName?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCodeExamples?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCodeMatchers?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCodePrefix?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCodeType?: FieldPolicy<any> | FieldReadFunction<any>,
	requiredFields?: FieldPolicy<any> | FieldReadFunction<any>,
	upperFields?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppKeySpecifier = ('aboutApp' | 'accessToken' | 'appUrl' | 'configurationUrl' | 'created' | 'dataPrivacy' | 'dataPrivacyUrl' | 'extensions' | 'homepageUrl' | 'id' | 'isActive' | 'manifestUrl' | 'metadata' | 'metafield' | 'metafields' | 'name' | 'permissions' | 'privateMetadata' | 'privateMetafield' | 'privateMetafields' | 'supportUrl' | 'tokens' | 'type' | 'version' | 'webhooks' | AppKeySpecifier)[];
export type AppFieldPolicy = {
	aboutApp?: FieldPolicy<any> | FieldReadFunction<any>,
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	appUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	configurationUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	created?: FieldPolicy<any> | FieldReadFunction<any>,
	dataPrivacy?: FieldPolicy<any> | FieldReadFunction<any>,
	dataPrivacyUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	extensions?: FieldPolicy<any> | FieldReadFunction<any>,
	homepageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	manifestUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	metafield?: FieldPolicy<any> | FieldReadFunction<any>,
	metafields?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafield?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafields?: FieldPolicy<any> | FieldReadFunction<any>,
	supportUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	tokens?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>,
	webhooks?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppActivateKeySpecifier = ('app' | 'appErrors' | 'errors' | AppActivateKeySpecifier)[];
export type AppActivateFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | AppCountableConnectionKeySpecifier)[];
export type AppCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppCountableEdgeKeySpecifier = ('cursor' | 'node' | AppCountableEdgeKeySpecifier)[];
export type AppCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppCreateKeySpecifier = ('app' | 'appErrors' | 'authToken' | 'errors' | AppCreateKeySpecifier)[];
export type AppCreateFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	authToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppDeactivateKeySpecifier = ('app' | 'appErrors' | 'errors' | AppDeactivateKeySpecifier)[];
export type AppDeactivateFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppDeleteKeySpecifier = ('app' | 'appErrors' | 'errors' | AppDeleteKeySpecifier)[];
export type AppDeleteFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppDeleteFailedInstallationKeySpecifier = ('appErrors' | 'appInstallation' | 'errors' | AppDeleteFailedInstallationKeySpecifier)[];
export type AppDeleteFailedInstallationFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	appInstallation?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppDeletedKeySpecifier = ('app' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | AppDeletedKeySpecifier)[];
export type AppDeletedFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppErrorKeySpecifier = ('code' | 'field' | 'message' | 'permissions' | AppErrorKeySpecifier)[];
export type AppErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppExtensionKeySpecifier = ('accessToken' | 'app' | 'id' | 'label' | 'mount' | 'permissions' | 'target' | 'url' | AppExtensionKeySpecifier)[];
export type AppExtensionFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	mount?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppExtensionCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | AppExtensionCountableConnectionKeySpecifier)[];
export type AppExtensionCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppExtensionCountableEdgeKeySpecifier = ('cursor' | 'node' | AppExtensionCountableEdgeKeySpecifier)[];
export type AppExtensionCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppFetchManifestKeySpecifier = ('appErrors' | 'errors' | 'manifest' | AppFetchManifestKeySpecifier)[];
export type AppFetchManifestFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	manifest?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppInstallKeySpecifier = ('appErrors' | 'appInstallation' | 'errors' | AppInstallKeySpecifier)[];
export type AppInstallFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	appInstallation?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppInstallationKeySpecifier = ('appName' | 'createdAt' | 'id' | 'manifestUrl' | 'message' | 'status' | 'updatedAt' | AppInstallationKeySpecifier)[];
export type AppInstallationFieldPolicy = {
	appName?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	manifestUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppInstalledKeySpecifier = ('app' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | AppInstalledKeySpecifier)[];
export type AppInstalledFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppManifestExtensionKeySpecifier = ('label' | 'mount' | 'permissions' | 'target' | 'url' | AppManifestExtensionKeySpecifier)[];
export type AppManifestExtensionFieldPolicy = {
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	mount?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppManifestWebhookKeySpecifier = ('asyncEvents' | 'name' | 'query' | 'syncEvents' | 'targetUrl' | AppManifestWebhookKeySpecifier)[];
export type AppManifestWebhookFieldPolicy = {
	asyncEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	query?: FieldPolicy<any> | FieldReadFunction<any>,
	syncEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	targetUrl?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppRetryInstallKeySpecifier = ('appErrors' | 'appInstallation' | 'errors' | AppRetryInstallKeySpecifier)[];
export type AppRetryInstallFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	appInstallation?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppStatusChangedKeySpecifier = ('app' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | AppStatusChangedKeySpecifier)[];
export type AppStatusChangedFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppTokenKeySpecifier = ('authToken' | 'id' | 'name' | AppTokenKeySpecifier)[];
export type AppTokenFieldPolicy = {
	authToken?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppTokenCreateKeySpecifier = ('appErrors' | 'appToken' | 'authToken' | 'errors' | AppTokenCreateKeySpecifier)[];
export type AppTokenCreateFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	appToken?: FieldPolicy<any> | FieldReadFunction<any>,
	authToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppTokenDeleteKeySpecifier = ('appErrors' | 'appToken' | 'errors' | AppTokenDeleteKeySpecifier)[];
export type AppTokenDeleteFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	appToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppTokenVerifyKeySpecifier = ('appErrors' | 'errors' | 'valid' | AppTokenVerifyKeySpecifier)[];
export type AppTokenVerifyFieldPolicy = {
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	valid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppUpdateKeySpecifier = ('app' | 'appErrors' | 'errors' | AppUpdateKeySpecifier)[];
export type AppUpdateFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	appErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppUpdatedKeySpecifier = ('app' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | AppUpdatedKeySpecifier)[];
export type AppUpdatedFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChoiceValueKeySpecifier = ('raw' | 'verbose' | ChoiceValueKeySpecifier)[];
export type ChoiceValueFieldPolicy = {
	raw?: FieldPolicy<any> | FieldReadFunction<any>,
	verbose?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConfirmAccountKeySpecifier = ('accountErrors' | 'errors' | 'user' | ConfirmAccountKeySpecifier)[];
export type ConfirmAccountFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConfirmEmailChangeKeySpecifier = ('accountErrors' | 'errors' | 'user' | ConfirmEmailChangeKeySpecifier)[];
export type ConfirmEmailChangeFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateTokenKeySpecifier = ('accountErrors' | 'csrfToken' | 'errors' | 'refreshToken' | 'token' | 'user' | CreateTokenKeySpecifier)[];
export type CreateTokenFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	csrfToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerBulkDeleteKeySpecifier = ('accountErrors' | 'count' | 'errors' | CustomerBulkDeleteKeySpecifier)[];
export type CustomerBulkDeleteFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerCreateKeySpecifier = ('accountErrors' | 'errors' | 'user' | CustomerCreateKeySpecifier)[];
export type CustomerCreateFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerDeleteKeySpecifier = ('accountErrors' | 'errors' | 'user' | CustomerDeleteKeySpecifier)[];
export type CustomerDeleteFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerEventKeySpecifier = ('app' | 'count' | 'date' | 'id' | 'message' | 'type' | 'user' | CustomerEventKeySpecifier)[];
export type CustomerEventFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerUpdateKeySpecifier = ('accountErrors' | 'errors' | 'user' | CustomerUpdateKeySpecifier)[];
export type CustomerUpdateFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeactivateAllUserTokensKeySpecifier = ('accountErrors' | 'errors' | DeactivateAllUserTokensKeySpecifier)[];
export type DeactivateAllUserTokensFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteMetadataKeySpecifier = ('errors' | 'item' | 'metadataErrors' | DeleteMetadataKeySpecifier)[];
export type DeleteMetadataFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeletePrivateMetadataKeySpecifier = ('errors' | 'item' | 'metadataErrors' | DeletePrivateMetadataKeySpecifier)[];
export type DeletePrivateMetadataFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventKeySpecifier = ('issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | EventKeySpecifier)[];
export type EventFieldPolicy = {
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryKeySpecifier = ('attempts' | 'createdAt' | 'eventType' | 'id' | 'payload' | 'status' | EventDeliveryKeySpecifier)[];
export type EventDeliveryFieldPolicy = {
	attempts?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	payload?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryAttemptKeySpecifier = ('createdAt' | 'duration' | 'id' | 'requestHeaders' | 'response' | 'responseHeaders' | 'responseStatusCode' | 'status' | 'taskId' | EventDeliveryAttemptKeySpecifier)[];
export type EventDeliveryAttemptFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	requestHeaders?: FieldPolicy<any> | FieldReadFunction<any>,
	response?: FieldPolicy<any> | FieldReadFunction<any>,
	responseHeaders?: FieldPolicy<any> | FieldReadFunction<any>,
	responseStatusCode?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taskId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryAttemptCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | EventDeliveryAttemptCountableConnectionKeySpecifier)[];
export type EventDeliveryAttemptCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryAttemptCountableEdgeKeySpecifier = ('cursor' | 'node' | EventDeliveryAttemptCountableEdgeKeySpecifier)[];
export type EventDeliveryAttemptCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | EventDeliveryCountableConnectionKeySpecifier)[];
export type EventDeliveryCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryCountableEdgeKeySpecifier = ('cursor' | 'node' | EventDeliveryCountableEdgeKeySpecifier)[];
export type EventDeliveryCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventDeliveryRetryKeySpecifier = ('delivery' | 'errors' | EventDeliveryRetryKeySpecifier)[];
export type EventDeliveryRetryFieldPolicy = {
	delivery?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExportErrorKeySpecifier = ('code' | 'field' | 'message' | ExportErrorKeySpecifier)[];
export type ExportErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExportEventKeySpecifier = ('app' | 'date' | 'id' | 'message' | 'type' | 'user' | ExportEventKeySpecifier)[];
export type ExportEventFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExportFileKeySpecifier = ('app' | 'createdAt' | 'events' | 'id' | 'message' | 'status' | 'updatedAt' | 'url' | 'user' | ExportFileKeySpecifier)[];
export type ExportFileFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExportFileCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | ExportFileCountableConnectionKeySpecifier)[];
export type ExportFileCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExportFileCountableEdgeKeySpecifier = ('cursor' | 'node' | ExportFileCountableEdgeKeySpecifier)[];
export type ExportFileCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExportInitiativesKeySpecifier = ('errors' | 'exportErrors' | 'exportFile' | ExportInitiativesKeySpecifier)[];
export type ExportInitiativesFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	exportErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	exportFile?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FileKeySpecifier = ('contentType' | 'url' | FileKeySpecifier)[];
export type FileFieldPolicy = {
	contentType?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FileUploadKeySpecifier = ('errors' | 'uploadErrors' | 'uploadedFile' | FileUploadKeySpecifier)[];
export type FileUploadFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadedFile?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupKeySpecifier = ('id' | 'name' | 'permissions' | 'userCanManage' | 'users' | GroupKeySpecifier)[];
export type GroupFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	userCanManage?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | GroupCountableConnectionKeySpecifier)[];
export type GroupCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupCountableEdgeKeySpecifier = ('cursor' | 'node' | GroupCountableEdgeKeySpecifier)[];
export type GroupCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageKeySpecifier = ('alt' | 'url' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	alt?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeKeySpecifier = ('created' | 'description' | 'id' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'metafield' | 'metafields' | 'privateMetadata' | 'privateMetafield' | 'privateMetafields' | 'seoDescription' | 'seoTitle' | 'slug' | 'thumbnail' | 'title' | 'translation' | 'updatedAt' | InitiativeKeySpecifier)[];
export type InitiativeFieldPolicy = {
	created?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	imageById?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>,
	mediaById?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	metafield?: FieldPolicy<any> | FieldReadFunction<any>,
	metafields?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafield?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafields?: FieldPolicy<any> | FieldReadFunction<any>,
	seoDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	seoTitle?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	translation?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeBulkDeleteKeySpecifier = ('count' | 'errors' | 'initiativeErrors' | InitiativeBulkDeleteKeySpecifier)[];
export type InitiativeBulkDeleteFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | InitiativeCountableConnectionKeySpecifier)[];
export type InitiativeCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeCountableEdgeKeySpecifier = ('cursor' | 'node' | InitiativeCountableEdgeKeySpecifier)[];
export type InitiativeCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeCreateKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | InitiativeCreateKeySpecifier)[];
export type InitiativeCreateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeCreatedKeySpecifier = ('initiative' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | InitiativeCreatedKeySpecifier)[];
export type InitiativeCreatedFieldPolicy = {
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeDeleteKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | InitiativeDeleteKeySpecifier)[];
export type InitiativeDeleteFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeDeletedKeySpecifier = ('initiative' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | InitiativeDeletedKeySpecifier)[];
export type InitiativeDeletedFieldPolicy = {
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeErrorKeySpecifier = ('attributes' | 'code' | 'field' | 'message' | 'values' | InitiativeErrorKeySpecifier)[];
export type InitiativeErrorFieldPolicy = {
	attributes?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeImageKeySpecifier = ('alt' | 'id' | 'sortOrder' | 'url' | InitiativeImageKeySpecifier)[];
export type InitiativeImageFieldPolicy = {
	alt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	sortOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeMediaKeySpecifier = ('alt' | 'id' | 'oembedData' | 'sortOrder' | 'type' | 'url' | InitiativeMediaKeySpecifier)[];
export type InitiativeMediaFieldPolicy = {
	alt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	oembedData?: FieldPolicy<any> | FieldReadFunction<any>,
	sortOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeMediaBulkDeleteKeySpecifier = ('count' | 'errors' | 'initiativeErrors' | InitiativeMediaBulkDeleteKeySpecifier)[];
export type InitiativeMediaBulkDeleteFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeMediaCreateKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | 'media' | InitiativeMediaCreateKeySpecifier)[];
export type InitiativeMediaCreateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeMediaDeleteKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | 'media' | InitiativeMediaDeleteKeySpecifier)[];
export type InitiativeMediaDeleteFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeMediaReorderKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | 'media' | InitiativeMediaReorderKeySpecifier)[];
export type InitiativeMediaReorderFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeMediaUpdateKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | 'media' | InitiativeMediaUpdateKeySpecifier)[];
export type InitiativeMediaUpdateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeTranslatableContentKeySpecifier = ('description' | 'descriptionJson' | 'id' | 'initiative' | 'name' | 'seoDescription' | 'seoTitle' | 'translation' | InitiativeTranslatableContentKeySpecifier)[];
export type InitiativeTranslatableContentFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	descriptionJson?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	seoDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	seoTitle?: FieldPolicy<any> | FieldReadFunction<any>,
	translation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeTranslateKeySpecifier = ('errors' | 'initiative' | 'translationErrors' | InitiativeTranslateKeySpecifier)[];
export type InitiativeTranslateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	translationErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeTranslationKeySpecifier = ('description' | 'id' | 'language' | 'seoDescription' | 'seoTitle' | 'title' | InitiativeTranslationKeySpecifier)[];
export type InitiativeTranslationFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	language?: FieldPolicy<any> | FieldReadFunction<any>,
	seoDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	seoTitle?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeUpdateKeySpecifier = ('errors' | 'initiative' | 'initiativeErrors' | InitiativeUpdateKeySpecifier)[];
export type InitiativeUpdateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InitiativeUpdatedKeySpecifier = ('initiative' | 'issuedAt' | 'issuingPrincipal' | 'recipient' | 'version' | InitiativeUpdatedKeySpecifier)[];
export type InitiativeUpdatedFieldPolicy = {
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JobKeySpecifier = ('createdAt' | 'message' | 'status' | 'updatedAt' | JobKeySpecifier)[];
export type JobFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LanguageDisplayKeySpecifier = ('code' | 'language' | LanguageDisplayKeySpecifier)[];
export type LanguageDisplayFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	language?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ManifestKeySpecifier = ('about' | 'appUrl' | 'configurationUrl' | 'dataPrivacy' | 'dataPrivacyUrl' | 'extensions' | 'homepageUrl' | 'identifier' | 'name' | 'permissions' | 'supportUrl' | 'tokenTargetUrl' | 'version' | 'webhooks' | ManifestKeySpecifier)[];
export type ManifestFieldPolicy = {
	about?: FieldPolicy<any> | FieldReadFunction<any>,
	appUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	configurationUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	dataPrivacy?: FieldPolicy<any> | FieldReadFunction<any>,
	dataPrivacyUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	extensions?: FieldPolicy<any> | FieldReadFunction<any>,
	homepageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	identifier?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	supportUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenTargetUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>,
	webhooks?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MetadataErrorKeySpecifier = ('code' | 'field' | 'message' | MetadataErrorKeySpecifier)[];
export type MetadataErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MetadataItemKeySpecifier = ('key' | 'value' | MetadataItemKeySpecifier)[];
export type MetadataItemFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('accountDelete' | 'accountRegister' | 'accountRequestDeletion' | 'accountUpdate' | 'appActivate' | 'appCreate' | 'appDeactivate' | 'appDelete' | 'appDeleteFailedInstallation' | 'appFetchManifest' | 'appInstall' | 'appRetryInstall' | 'appTokenCreate' | 'appTokenDelete' | 'appTokenVerify' | 'appUpdate' | 'confirmAccount' | 'confirmEmailChange' | 'customerBulkDelete' | 'customerCreate' | 'customerDelete' | 'customerUpdate' | 'deleteMetadata' | 'deletePrivateMetadata' | 'eventDeliveryRetry' | 'exportInitiatives' | 'fileUpload' | 'initiativeBulkDelete' | 'initiativeCreate' | 'initiativeDelete' | 'initiativeMediaBulkDelete' | 'initiativeMediaCreate' | 'initiativeMediaDelete' | 'initiativeMediaReorder' | 'initiativeMediaUpdate' | 'initiativeTranslate' | 'initiativeUpdate' | 'passwordChange' | 'permissionGroupCreate' | 'permissionGroupDelete' | 'permissionGroupUpdate' | 'requestEmailChange' | 'requestPasswordReset' | 'setPassword' | 'staffBulkDelete' | 'staffCreate' | 'staffDelete' | 'staffUpdate' | 'tokenCreate' | 'tokenRefresh' | 'tokenVerify' | 'tokensDeactivateAll' | 'updateMetadata' | 'updatePrivateMetadata' | 'userAvatarDelete' | 'userAvatarUpdate' | 'userBulkSetActive' | 'webhookCreate' | 'webhookDelete' | 'webhookUpdate' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	accountDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	accountRegister?: FieldPolicy<any> | FieldReadFunction<any>,
	accountRequestDeletion?: FieldPolicy<any> | FieldReadFunction<any>,
	accountUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	appActivate?: FieldPolicy<any> | FieldReadFunction<any>,
	appCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	appDeactivate?: FieldPolicy<any> | FieldReadFunction<any>,
	appDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	appDeleteFailedInstallation?: FieldPolicy<any> | FieldReadFunction<any>,
	appFetchManifest?: FieldPolicy<any> | FieldReadFunction<any>,
	appInstall?: FieldPolicy<any> | FieldReadFunction<any>,
	appRetryInstall?: FieldPolicy<any> | FieldReadFunction<any>,
	appTokenCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	appTokenDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	appTokenVerify?: FieldPolicy<any> | FieldReadFunction<any>,
	appUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmEmailChange?: FieldPolicy<any> | FieldReadFunction<any>,
	customerBulkDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	customerCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	customerDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	customerUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePrivateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	eventDeliveryRetry?: FieldPolicy<any> | FieldReadFunction<any>,
	exportInitiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	fileUpload?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeBulkDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeMediaBulkDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeMediaCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeMediaDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeMediaReorder?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeMediaUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeTranslate?: FieldPolicy<any> | FieldReadFunction<any>,
	initiativeUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordChange?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroupCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroupDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroupUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	requestEmailChange?: FieldPolicy<any> | FieldReadFunction<any>,
	requestPasswordReset?: FieldPolicy<any> | FieldReadFunction<any>,
	setPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	staffBulkDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	staffCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	staffDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	staffUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenRefresh?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenVerify?: FieldPolicy<any> | FieldReadFunction<any>,
	tokensDeactivateAll?: FieldPolicy<any> | FieldReadFunction<any>,
	updateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePrivateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	userAvatarDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	userAvatarUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	userBulkSetActive?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookUpdate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObjectWithMetadataKeySpecifier = ('metadata' | 'metafield' | 'metafields' | 'privateMetadata' | 'privateMetafield' | 'privateMetafields' | ObjectWithMetadataKeySpecifier)[];
export type ObjectWithMetadataFieldPolicy = {
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	metafield?: FieldPolicy<any> | FieldReadFunction<any>,
	metafields?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafield?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafields?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PasswordChangeKeySpecifier = ('accountErrors' | 'errors' | 'user' | PasswordChangeKeySpecifier)[];
export type PasswordChangeFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionKeySpecifier = ('code' | 'name' | PermissionKeySpecifier)[];
export type PermissionFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupCreateKeySpecifier = ('errors' | 'group' | 'permissionGroupErrors' | PermissionGroupCreateKeySpecifier)[];
export type PermissionGroupCreateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	group?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroupErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupCreatedKeySpecifier = ('issuedAt' | 'issuingPrincipal' | 'permissionGroup' | 'recipient' | 'version' | PermissionGroupCreatedKeySpecifier)[];
export type PermissionGroupCreatedFieldPolicy = {
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupDeleteKeySpecifier = ('errors' | 'group' | 'permissionGroupErrors' | PermissionGroupDeleteKeySpecifier)[];
export type PermissionGroupDeleteFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	group?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroupErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupDeletedKeySpecifier = ('issuedAt' | 'issuingPrincipal' | 'permissionGroup' | 'recipient' | 'version' | PermissionGroupDeletedKeySpecifier)[];
export type PermissionGroupDeletedFieldPolicy = {
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupErrorKeySpecifier = ('code' | 'field' | 'message' | 'permissions' | 'users' | PermissionGroupErrorKeySpecifier)[];
export type PermissionGroupErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupUpdateKeySpecifier = ('errors' | 'group' | 'permissionGroupErrors' | PermissionGroupUpdateKeySpecifier)[];
export type PermissionGroupUpdateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	group?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroupErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionGroupUpdatedKeySpecifier = ('issuedAt' | 'issuingPrincipal' | 'permissionGroup' | 'recipient' | 'version' | PermissionGroupUpdatedKeySpecifier)[];
export type PermissionGroupUpdatedFieldPolicy = {
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoliticalEntityKeySpecifier = ('id' | 'name' | PoliticalEntityKeySpecifier)[];
export type PoliticalEntityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoliticalEntityCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | PoliticalEntityCountableConnectionKeySpecifier)[];
export type PoliticalEntityCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoliticalEntityCountableEdgeKeySpecifier = ('cursor' | 'node' | PoliticalEntityCountableEdgeKeySpecifier)[];
export type PoliticalEntityCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('_entities' | '_service' | 'addressValidationRules' | 'app' | 'appExtension' | 'appExtensions' | 'apps' | 'appsInstallations' | 'customers' | 'exportFile' | 'exportFiles' | 'initiative' | 'initiatives' | 'me' | 'permissionGroup' | 'permissionGroups' | 'politicalEntities' | 'staffUsers' | 'translation' | 'translations' | 'user' | 'webhook' | 'webhookEvents' | 'webhookSamplePayload' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	_entities?: FieldPolicy<any> | FieldReadFunction<any>,
	_service?: FieldPolicy<any> | FieldReadFunction<any>,
	addressValidationRules?: FieldPolicy<any> | FieldReadFunction<any>,
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	appExtension?: FieldPolicy<any> | FieldReadFunction<any>,
	appExtensions?: FieldPolicy<any> | FieldReadFunction<any>,
	apps?: FieldPolicy<any> | FieldReadFunction<any>,
	appsInstallations?: FieldPolicy<any> | FieldReadFunction<any>,
	customers?: FieldPolicy<any> | FieldReadFunction<any>,
	exportFile?: FieldPolicy<any> | FieldReadFunction<any>,
	exportFiles?: FieldPolicy<any> | FieldReadFunction<any>,
	initiative?: FieldPolicy<any> | FieldReadFunction<any>,
	initiatives?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	politicalEntities?: FieldPolicy<any> | FieldReadFunction<any>,
	staffUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	translation?: FieldPolicy<any> | FieldReadFunction<any>,
	translations?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	webhook?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookSamplePayload?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RefreshTokenKeySpecifier = ('accountErrors' | 'errors' | 'token' | 'user' | RefreshTokenKeySpecifier)[];
export type RefreshTokenFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RequestEmailChangeKeySpecifier = ('accountErrors' | 'errors' | 'user' | RequestEmailChangeKeySpecifier)[];
export type RequestEmailChangeFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RequestPasswordResetKeySpecifier = ('accountErrors' | 'errors' | RequestPasswordResetKeySpecifier)[];
export type RequestPasswordResetFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SetPasswordKeySpecifier = ('accountErrors' | 'csrfToken' | 'errors' | 'refreshToken' | 'token' | 'user' | SetPasswordKeySpecifier)[];
export type SetPasswordFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	csrfToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StaffBulkDeleteKeySpecifier = ('count' | 'errors' | 'staffErrors' | StaffBulkDeleteKeySpecifier)[];
export type StaffBulkDeleteFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	staffErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StaffCreateKeySpecifier = ('errors' | 'staffErrors' | 'user' | StaffCreateKeySpecifier)[];
export type StaffCreateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	staffErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StaffDeleteKeySpecifier = ('errors' | 'staffErrors' | 'user' | StaffDeleteKeySpecifier)[];
export type StaffDeleteFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	staffErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StaffErrorKeySpecifier = ('code' | 'field' | 'groups' | 'message' | 'permissions' | 'users' | StaffErrorKeySpecifier)[];
export type StaffErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	groups?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StaffUpdateKeySpecifier = ('errors' | 'staffErrors' | 'user' | StaffUpdateKeySpecifier)[];
export type StaffUpdateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	staffErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('event' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	event?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TranslatableItemConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | TranslatableItemConnectionKeySpecifier)[];
export type TranslatableItemConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TranslatableItemEdgeKeySpecifier = ('cursor' | 'node' | TranslatableItemEdgeKeySpecifier)[];
export type TranslatableItemEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TranslationCreatedKeySpecifier = ('issuedAt' | 'issuingPrincipal' | 'recipient' | 'translation' | 'version' | TranslationCreatedKeySpecifier)[];
export type TranslationCreatedFieldPolicy = {
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	translation?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TranslationErrorKeySpecifier = ('code' | 'field' | 'message' | TranslationErrorKeySpecifier)[];
export type TranslationErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TranslationUpdatedKeySpecifier = ('issuedAt' | 'issuingPrincipal' | 'recipient' | 'translation' | 'version' | TranslationUpdatedKeySpecifier)[];
export type TranslationUpdatedFieldPolicy = {
	issuedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	issuingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	translation?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateMetadataKeySpecifier = ('errors' | 'item' | 'metadataErrors' | UpdateMetadataKeySpecifier)[];
export type UpdateMetadataFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdatePrivateMetadataKeySpecifier = ('errors' | 'item' | 'metadataErrors' | UpdatePrivateMetadataKeySpecifier)[];
export type UpdatePrivateMetadataFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UploadErrorKeySpecifier = ('code' | 'field' | 'message' | UploadErrorKeySpecifier)[];
export type UploadErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('avatar' | 'dateJoined' | 'editableGroups' | 'email' | 'events' | 'firstName' | 'id' | 'isActive' | 'isStaff' | 'languageCode' | 'lastLogin' | 'lastName' | 'metadata' | 'metafield' | 'metafields' | 'note' | 'permissionGroups' | 'privateMetadata' | 'privateMetafield' | 'privateMetafields' | 'updatedAt' | 'userPermissions' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	dateJoined?: FieldPolicy<any> | FieldReadFunction<any>,
	editableGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	isStaff?: FieldPolicy<any> | FieldReadFunction<any>,
	languageCode?: FieldPolicy<any> | FieldReadFunction<any>,
	lastLogin?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	metafield?: FieldPolicy<any> | FieldReadFunction<any>,
	metafields?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetadata?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafield?: FieldPolicy<any> | FieldReadFunction<any>,
	privateMetafields?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userPermissions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserAvatarDeleteKeySpecifier = ('accountErrors' | 'errors' | 'user' | UserAvatarDeleteKeySpecifier)[];
export type UserAvatarDeleteFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserAvatarUpdateKeySpecifier = ('accountErrors' | 'errors' | 'user' | UserAvatarUpdateKeySpecifier)[];
export type UserAvatarUpdateFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserBulkSetActiveKeySpecifier = ('accountErrors' | 'count' | 'errors' | UserBulkSetActiveKeySpecifier)[];
export type UserBulkSetActiveFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserCountableConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | UserCountableConnectionKeySpecifier)[];
export type UserCountableConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserCountableEdgeKeySpecifier = ('cursor' | 'node' | UserCountableEdgeKeySpecifier)[];
export type UserCountableEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserPermissionKeySpecifier = ('code' | 'name' | 'sourcePermissionGroups' | UserPermissionKeySpecifier)[];
export type UserPermissionFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	sourcePermissionGroups?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerifyTokenKeySpecifier = ('accountErrors' | 'errors' | 'isValid' | 'payload' | 'user' | VerifyTokenKeySpecifier)[];
export type VerifyTokenFieldPolicy = {
	accountErrors?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	isValid?: FieldPolicy<any> | FieldReadFunction<any>,
	payload?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookKeySpecifier = ('app' | 'asyncEvents' | 'eventDeliveries' | 'events' | 'id' | 'isActive' | 'name' | 'secretKey' | 'subscriptionQuery' | 'syncEvents' | 'targetUrl' | WebhookKeySpecifier)[];
export type WebhookFieldPolicy = {
	app?: FieldPolicy<any> | FieldReadFunction<any>,
	asyncEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	eventDeliveries?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	secretKey?: FieldPolicy<any> | FieldReadFunction<any>,
	subscriptionQuery?: FieldPolicy<any> | FieldReadFunction<any>,
	syncEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	targetUrl?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookCreateKeySpecifier = ('errors' | 'webhook' | 'webhookErrors' | WebhookCreateKeySpecifier)[];
export type WebhookCreateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	webhook?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookDeleteKeySpecifier = ('errors' | 'webhook' | 'webhookErrors' | WebhookDeleteKeySpecifier)[];
export type WebhookDeleteFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	webhook?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookErrorKeySpecifier = ('code' | 'field' | 'message' | WebhookErrorKeySpecifier)[];
export type WebhookErrorFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookEventKeySpecifier = ('eventType' | 'name' | WebhookEventKeySpecifier)[];
export type WebhookEventFieldPolicy = {
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookEventAsyncKeySpecifier = ('eventType' | 'name' | WebhookEventAsyncKeySpecifier)[];
export type WebhookEventAsyncFieldPolicy = {
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookEventSyncKeySpecifier = ('eventType' | 'name' | WebhookEventSyncKeySpecifier)[];
export type WebhookEventSyncFieldPolicy = {
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WebhookUpdateKeySpecifier = ('errors' | 'webhook' | 'webhookErrors' | WebhookUpdateKeySpecifier)[];
export type WebhookUpdateFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	webhook?: FieldPolicy<any> | FieldReadFunction<any>,
	webhookErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _ServiceKeySpecifier = ('sdl' | _ServiceKeySpecifier)[];
export type _ServiceFieldPolicy = {
	sdl?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AccountDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountDeleteKeySpecifier | (() => undefined | AccountDeleteKeySpecifier),
		fields?: AccountDeleteFieldPolicy,
	},
	AccountError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountErrorKeySpecifier | (() => undefined | AccountErrorKeySpecifier),
		fields?: AccountErrorFieldPolicy,
	},
	AccountRegister?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountRegisterKeySpecifier | (() => undefined | AccountRegisterKeySpecifier),
		fields?: AccountRegisterFieldPolicy,
	},
	AccountRequestDeletion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountRequestDeletionKeySpecifier | (() => undefined | AccountRequestDeletionKeySpecifier),
		fields?: AccountRequestDeletionFieldPolicy,
	},
	AccountUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountUpdateKeySpecifier | (() => undefined | AccountUpdateKeySpecifier),
		fields?: AccountUpdateFieldPolicy,
	},
	AddressValidationData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressValidationDataKeySpecifier | (() => undefined | AddressValidationDataKeySpecifier),
		fields?: AddressValidationDataFieldPolicy,
	},
	App?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppKeySpecifier | (() => undefined | AppKeySpecifier),
		fields?: AppFieldPolicy,
	},
	AppActivate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppActivateKeySpecifier | (() => undefined | AppActivateKeySpecifier),
		fields?: AppActivateFieldPolicy,
	},
	AppCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppCountableConnectionKeySpecifier | (() => undefined | AppCountableConnectionKeySpecifier),
		fields?: AppCountableConnectionFieldPolicy,
	},
	AppCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppCountableEdgeKeySpecifier | (() => undefined | AppCountableEdgeKeySpecifier),
		fields?: AppCountableEdgeFieldPolicy,
	},
	AppCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppCreateKeySpecifier | (() => undefined | AppCreateKeySpecifier),
		fields?: AppCreateFieldPolicy,
	},
	AppDeactivate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppDeactivateKeySpecifier | (() => undefined | AppDeactivateKeySpecifier),
		fields?: AppDeactivateFieldPolicy,
	},
	AppDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppDeleteKeySpecifier | (() => undefined | AppDeleteKeySpecifier),
		fields?: AppDeleteFieldPolicy,
	},
	AppDeleteFailedInstallation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppDeleteFailedInstallationKeySpecifier | (() => undefined | AppDeleteFailedInstallationKeySpecifier),
		fields?: AppDeleteFailedInstallationFieldPolicy,
	},
	AppDeleted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppDeletedKeySpecifier | (() => undefined | AppDeletedKeySpecifier),
		fields?: AppDeletedFieldPolicy,
	},
	AppError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppErrorKeySpecifier | (() => undefined | AppErrorKeySpecifier),
		fields?: AppErrorFieldPolicy,
	},
	AppExtension?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppExtensionKeySpecifier | (() => undefined | AppExtensionKeySpecifier),
		fields?: AppExtensionFieldPolicy,
	},
	AppExtensionCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppExtensionCountableConnectionKeySpecifier | (() => undefined | AppExtensionCountableConnectionKeySpecifier),
		fields?: AppExtensionCountableConnectionFieldPolicy,
	},
	AppExtensionCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppExtensionCountableEdgeKeySpecifier | (() => undefined | AppExtensionCountableEdgeKeySpecifier),
		fields?: AppExtensionCountableEdgeFieldPolicy,
	},
	AppFetchManifest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppFetchManifestKeySpecifier | (() => undefined | AppFetchManifestKeySpecifier),
		fields?: AppFetchManifestFieldPolicy,
	},
	AppInstall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppInstallKeySpecifier | (() => undefined | AppInstallKeySpecifier),
		fields?: AppInstallFieldPolicy,
	},
	AppInstallation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppInstallationKeySpecifier | (() => undefined | AppInstallationKeySpecifier),
		fields?: AppInstallationFieldPolicy,
	},
	AppInstalled?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppInstalledKeySpecifier | (() => undefined | AppInstalledKeySpecifier),
		fields?: AppInstalledFieldPolicy,
	},
	AppManifestExtension?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppManifestExtensionKeySpecifier | (() => undefined | AppManifestExtensionKeySpecifier),
		fields?: AppManifestExtensionFieldPolicy,
	},
	AppManifestWebhook?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppManifestWebhookKeySpecifier | (() => undefined | AppManifestWebhookKeySpecifier),
		fields?: AppManifestWebhookFieldPolicy,
	},
	AppRetryInstall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppRetryInstallKeySpecifier | (() => undefined | AppRetryInstallKeySpecifier),
		fields?: AppRetryInstallFieldPolicy,
	},
	AppStatusChanged?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppStatusChangedKeySpecifier | (() => undefined | AppStatusChangedKeySpecifier),
		fields?: AppStatusChangedFieldPolicy,
	},
	AppToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppTokenKeySpecifier | (() => undefined | AppTokenKeySpecifier),
		fields?: AppTokenFieldPolicy,
	},
	AppTokenCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppTokenCreateKeySpecifier | (() => undefined | AppTokenCreateKeySpecifier),
		fields?: AppTokenCreateFieldPolicy,
	},
	AppTokenDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppTokenDeleteKeySpecifier | (() => undefined | AppTokenDeleteKeySpecifier),
		fields?: AppTokenDeleteFieldPolicy,
	},
	AppTokenVerify?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppTokenVerifyKeySpecifier | (() => undefined | AppTokenVerifyKeySpecifier),
		fields?: AppTokenVerifyFieldPolicy,
	},
	AppUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppUpdateKeySpecifier | (() => undefined | AppUpdateKeySpecifier),
		fields?: AppUpdateFieldPolicy,
	},
	AppUpdated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppUpdatedKeySpecifier | (() => undefined | AppUpdatedKeySpecifier),
		fields?: AppUpdatedFieldPolicy,
	},
	ChoiceValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChoiceValueKeySpecifier | (() => undefined | ChoiceValueKeySpecifier),
		fields?: ChoiceValueFieldPolicy,
	},
	ConfirmAccount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConfirmAccountKeySpecifier | (() => undefined | ConfirmAccountKeySpecifier),
		fields?: ConfirmAccountFieldPolicy,
	},
	ConfirmEmailChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConfirmEmailChangeKeySpecifier | (() => undefined | ConfirmEmailChangeKeySpecifier),
		fields?: ConfirmEmailChangeFieldPolicy,
	},
	CreateToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateTokenKeySpecifier | (() => undefined | CreateTokenKeySpecifier),
		fields?: CreateTokenFieldPolicy,
	},
	CustomerBulkDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerBulkDeleteKeySpecifier | (() => undefined | CustomerBulkDeleteKeySpecifier),
		fields?: CustomerBulkDeleteFieldPolicy,
	},
	CustomerCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerCreateKeySpecifier | (() => undefined | CustomerCreateKeySpecifier),
		fields?: CustomerCreateFieldPolicy,
	},
	CustomerDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerDeleteKeySpecifier | (() => undefined | CustomerDeleteKeySpecifier),
		fields?: CustomerDeleteFieldPolicy,
	},
	CustomerEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerEventKeySpecifier | (() => undefined | CustomerEventKeySpecifier),
		fields?: CustomerEventFieldPolicy,
	},
	CustomerUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerUpdateKeySpecifier | (() => undefined | CustomerUpdateKeySpecifier),
		fields?: CustomerUpdateFieldPolicy,
	},
	DeactivateAllUserTokens?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeactivateAllUserTokensKeySpecifier | (() => undefined | DeactivateAllUserTokensKeySpecifier),
		fields?: DeactivateAllUserTokensFieldPolicy,
	},
	DeleteMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteMetadataKeySpecifier | (() => undefined | DeleteMetadataKeySpecifier),
		fields?: DeleteMetadataFieldPolicy,
	},
	DeletePrivateMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeletePrivateMetadataKeySpecifier | (() => undefined | DeletePrivateMetadataKeySpecifier),
		fields?: DeletePrivateMetadataFieldPolicy,
	},
	Event?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventKeySpecifier | (() => undefined | EventKeySpecifier),
		fields?: EventFieldPolicy,
	},
	EventDelivery?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryKeySpecifier | (() => undefined | EventDeliveryKeySpecifier),
		fields?: EventDeliveryFieldPolicy,
	},
	EventDeliveryAttempt?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryAttemptKeySpecifier | (() => undefined | EventDeliveryAttemptKeySpecifier),
		fields?: EventDeliveryAttemptFieldPolicy,
	},
	EventDeliveryAttemptCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryAttemptCountableConnectionKeySpecifier | (() => undefined | EventDeliveryAttemptCountableConnectionKeySpecifier),
		fields?: EventDeliveryAttemptCountableConnectionFieldPolicy,
	},
	EventDeliveryAttemptCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryAttemptCountableEdgeKeySpecifier | (() => undefined | EventDeliveryAttemptCountableEdgeKeySpecifier),
		fields?: EventDeliveryAttemptCountableEdgeFieldPolicy,
	},
	EventDeliveryCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryCountableConnectionKeySpecifier | (() => undefined | EventDeliveryCountableConnectionKeySpecifier),
		fields?: EventDeliveryCountableConnectionFieldPolicy,
	},
	EventDeliveryCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryCountableEdgeKeySpecifier | (() => undefined | EventDeliveryCountableEdgeKeySpecifier),
		fields?: EventDeliveryCountableEdgeFieldPolicy,
	},
	EventDeliveryRetry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventDeliveryRetryKeySpecifier | (() => undefined | EventDeliveryRetryKeySpecifier),
		fields?: EventDeliveryRetryFieldPolicy,
	},
	ExportError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExportErrorKeySpecifier | (() => undefined | ExportErrorKeySpecifier),
		fields?: ExportErrorFieldPolicy,
	},
	ExportEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExportEventKeySpecifier | (() => undefined | ExportEventKeySpecifier),
		fields?: ExportEventFieldPolicy,
	},
	ExportFile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExportFileKeySpecifier | (() => undefined | ExportFileKeySpecifier),
		fields?: ExportFileFieldPolicy,
	},
	ExportFileCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExportFileCountableConnectionKeySpecifier | (() => undefined | ExportFileCountableConnectionKeySpecifier),
		fields?: ExportFileCountableConnectionFieldPolicy,
	},
	ExportFileCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExportFileCountableEdgeKeySpecifier | (() => undefined | ExportFileCountableEdgeKeySpecifier),
		fields?: ExportFileCountableEdgeFieldPolicy,
	},
	ExportInitiatives?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExportInitiativesKeySpecifier | (() => undefined | ExportInitiativesKeySpecifier),
		fields?: ExportInitiativesFieldPolicy,
	},
	File?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FileKeySpecifier | (() => undefined | FileKeySpecifier),
		fields?: FileFieldPolicy,
	},
	FileUpload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FileUploadKeySpecifier | (() => undefined | FileUploadKeySpecifier),
		fields?: FileUploadFieldPolicy,
	},
	Group?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupKeySpecifier | (() => undefined | GroupKeySpecifier),
		fields?: GroupFieldPolicy,
	},
	GroupCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupCountableConnectionKeySpecifier | (() => undefined | GroupCountableConnectionKeySpecifier),
		fields?: GroupCountableConnectionFieldPolicy,
	},
	GroupCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupCountableEdgeKeySpecifier | (() => undefined | GroupCountableEdgeKeySpecifier),
		fields?: GroupCountableEdgeFieldPolicy,
	},
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	Initiative?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeKeySpecifier | (() => undefined | InitiativeKeySpecifier),
		fields?: InitiativeFieldPolicy,
	},
	InitiativeBulkDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeBulkDeleteKeySpecifier | (() => undefined | InitiativeBulkDeleteKeySpecifier),
		fields?: InitiativeBulkDeleteFieldPolicy,
	},
	InitiativeCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeCountableConnectionKeySpecifier | (() => undefined | InitiativeCountableConnectionKeySpecifier),
		fields?: InitiativeCountableConnectionFieldPolicy,
	},
	InitiativeCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeCountableEdgeKeySpecifier | (() => undefined | InitiativeCountableEdgeKeySpecifier),
		fields?: InitiativeCountableEdgeFieldPolicy,
	},
	InitiativeCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeCreateKeySpecifier | (() => undefined | InitiativeCreateKeySpecifier),
		fields?: InitiativeCreateFieldPolicy,
	},
	InitiativeCreated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeCreatedKeySpecifier | (() => undefined | InitiativeCreatedKeySpecifier),
		fields?: InitiativeCreatedFieldPolicy,
	},
	InitiativeDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeDeleteKeySpecifier | (() => undefined | InitiativeDeleteKeySpecifier),
		fields?: InitiativeDeleteFieldPolicy,
	},
	InitiativeDeleted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeDeletedKeySpecifier | (() => undefined | InitiativeDeletedKeySpecifier),
		fields?: InitiativeDeletedFieldPolicy,
	},
	InitiativeError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeErrorKeySpecifier | (() => undefined | InitiativeErrorKeySpecifier),
		fields?: InitiativeErrorFieldPolicy,
	},
	InitiativeImage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeImageKeySpecifier | (() => undefined | InitiativeImageKeySpecifier),
		fields?: InitiativeImageFieldPolicy,
	},
	InitiativeMedia?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeMediaKeySpecifier | (() => undefined | InitiativeMediaKeySpecifier),
		fields?: InitiativeMediaFieldPolicy,
	},
	InitiativeMediaBulkDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeMediaBulkDeleteKeySpecifier | (() => undefined | InitiativeMediaBulkDeleteKeySpecifier),
		fields?: InitiativeMediaBulkDeleteFieldPolicy,
	},
	InitiativeMediaCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeMediaCreateKeySpecifier | (() => undefined | InitiativeMediaCreateKeySpecifier),
		fields?: InitiativeMediaCreateFieldPolicy,
	},
	InitiativeMediaDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeMediaDeleteKeySpecifier | (() => undefined | InitiativeMediaDeleteKeySpecifier),
		fields?: InitiativeMediaDeleteFieldPolicy,
	},
	InitiativeMediaReorder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeMediaReorderKeySpecifier | (() => undefined | InitiativeMediaReorderKeySpecifier),
		fields?: InitiativeMediaReorderFieldPolicy,
	},
	InitiativeMediaUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeMediaUpdateKeySpecifier | (() => undefined | InitiativeMediaUpdateKeySpecifier),
		fields?: InitiativeMediaUpdateFieldPolicy,
	},
	InitiativeTranslatableContent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeTranslatableContentKeySpecifier | (() => undefined | InitiativeTranslatableContentKeySpecifier),
		fields?: InitiativeTranslatableContentFieldPolicy,
	},
	InitiativeTranslate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeTranslateKeySpecifier | (() => undefined | InitiativeTranslateKeySpecifier),
		fields?: InitiativeTranslateFieldPolicy,
	},
	InitiativeTranslation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeTranslationKeySpecifier | (() => undefined | InitiativeTranslationKeySpecifier),
		fields?: InitiativeTranslationFieldPolicy,
	},
	InitiativeUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeUpdateKeySpecifier | (() => undefined | InitiativeUpdateKeySpecifier),
		fields?: InitiativeUpdateFieldPolicy,
	},
	InitiativeUpdated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InitiativeUpdatedKeySpecifier | (() => undefined | InitiativeUpdatedKeySpecifier),
		fields?: InitiativeUpdatedFieldPolicy,
	},
	Job?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JobKeySpecifier | (() => undefined | JobKeySpecifier),
		fields?: JobFieldPolicy,
	},
	LanguageDisplay?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LanguageDisplayKeySpecifier | (() => undefined | LanguageDisplayKeySpecifier),
		fields?: LanguageDisplayFieldPolicy,
	},
	Manifest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ManifestKeySpecifier | (() => undefined | ManifestKeySpecifier),
		fields?: ManifestFieldPolicy,
	},
	MetadataError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MetadataErrorKeySpecifier | (() => undefined | MetadataErrorKeySpecifier),
		fields?: MetadataErrorFieldPolicy,
	},
	MetadataItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MetadataItemKeySpecifier | (() => undefined | MetadataItemKeySpecifier),
		fields?: MetadataItemFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	ObjectWithMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObjectWithMetadataKeySpecifier | (() => undefined | ObjectWithMetadataKeySpecifier),
		fields?: ObjectWithMetadataFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	PasswordChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PasswordChangeKeySpecifier | (() => undefined | PasswordChangeKeySpecifier),
		fields?: PasswordChangeFieldPolicy,
	},
	Permission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionKeySpecifier | (() => undefined | PermissionKeySpecifier),
		fields?: PermissionFieldPolicy,
	},
	PermissionGroupCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupCreateKeySpecifier | (() => undefined | PermissionGroupCreateKeySpecifier),
		fields?: PermissionGroupCreateFieldPolicy,
	},
	PermissionGroupCreated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupCreatedKeySpecifier | (() => undefined | PermissionGroupCreatedKeySpecifier),
		fields?: PermissionGroupCreatedFieldPolicy,
	},
	PermissionGroupDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupDeleteKeySpecifier | (() => undefined | PermissionGroupDeleteKeySpecifier),
		fields?: PermissionGroupDeleteFieldPolicy,
	},
	PermissionGroupDeleted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupDeletedKeySpecifier | (() => undefined | PermissionGroupDeletedKeySpecifier),
		fields?: PermissionGroupDeletedFieldPolicy,
	},
	PermissionGroupError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupErrorKeySpecifier | (() => undefined | PermissionGroupErrorKeySpecifier),
		fields?: PermissionGroupErrorFieldPolicy,
	},
	PermissionGroupUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupUpdateKeySpecifier | (() => undefined | PermissionGroupUpdateKeySpecifier),
		fields?: PermissionGroupUpdateFieldPolicy,
	},
	PermissionGroupUpdated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionGroupUpdatedKeySpecifier | (() => undefined | PermissionGroupUpdatedKeySpecifier),
		fields?: PermissionGroupUpdatedFieldPolicy,
	},
	PoliticalEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoliticalEntityKeySpecifier | (() => undefined | PoliticalEntityKeySpecifier),
		fields?: PoliticalEntityFieldPolicy,
	},
	PoliticalEntityCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoliticalEntityCountableConnectionKeySpecifier | (() => undefined | PoliticalEntityCountableConnectionKeySpecifier),
		fields?: PoliticalEntityCountableConnectionFieldPolicy,
	},
	PoliticalEntityCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoliticalEntityCountableEdgeKeySpecifier | (() => undefined | PoliticalEntityCountableEdgeKeySpecifier),
		fields?: PoliticalEntityCountableEdgeFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RefreshToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RefreshTokenKeySpecifier | (() => undefined | RefreshTokenKeySpecifier),
		fields?: RefreshTokenFieldPolicy,
	},
	RequestEmailChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RequestEmailChangeKeySpecifier | (() => undefined | RequestEmailChangeKeySpecifier),
		fields?: RequestEmailChangeFieldPolicy,
	},
	RequestPasswordReset?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RequestPasswordResetKeySpecifier | (() => undefined | RequestPasswordResetKeySpecifier),
		fields?: RequestPasswordResetFieldPolicy,
	},
	SetPassword?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SetPasswordKeySpecifier | (() => undefined | SetPasswordKeySpecifier),
		fields?: SetPasswordFieldPolicy,
	},
	StaffBulkDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StaffBulkDeleteKeySpecifier | (() => undefined | StaffBulkDeleteKeySpecifier),
		fields?: StaffBulkDeleteFieldPolicy,
	},
	StaffCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StaffCreateKeySpecifier | (() => undefined | StaffCreateKeySpecifier),
		fields?: StaffCreateFieldPolicy,
	},
	StaffDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StaffDeleteKeySpecifier | (() => undefined | StaffDeleteKeySpecifier),
		fields?: StaffDeleteFieldPolicy,
	},
	StaffError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StaffErrorKeySpecifier | (() => undefined | StaffErrorKeySpecifier),
		fields?: StaffErrorFieldPolicy,
	},
	StaffUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StaffUpdateKeySpecifier | (() => undefined | StaffUpdateKeySpecifier),
		fields?: StaffUpdateFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	TranslatableItemConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TranslatableItemConnectionKeySpecifier | (() => undefined | TranslatableItemConnectionKeySpecifier),
		fields?: TranslatableItemConnectionFieldPolicy,
	},
	TranslatableItemEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TranslatableItemEdgeKeySpecifier | (() => undefined | TranslatableItemEdgeKeySpecifier),
		fields?: TranslatableItemEdgeFieldPolicy,
	},
	TranslationCreated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TranslationCreatedKeySpecifier | (() => undefined | TranslationCreatedKeySpecifier),
		fields?: TranslationCreatedFieldPolicy,
	},
	TranslationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TranslationErrorKeySpecifier | (() => undefined | TranslationErrorKeySpecifier),
		fields?: TranslationErrorFieldPolicy,
	},
	TranslationUpdated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TranslationUpdatedKeySpecifier | (() => undefined | TranslationUpdatedKeySpecifier),
		fields?: TranslationUpdatedFieldPolicy,
	},
	UpdateMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateMetadataKeySpecifier | (() => undefined | UpdateMetadataKeySpecifier),
		fields?: UpdateMetadataFieldPolicy,
	},
	UpdatePrivateMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdatePrivateMetadataKeySpecifier | (() => undefined | UpdatePrivateMetadataKeySpecifier),
		fields?: UpdatePrivateMetadataFieldPolicy,
	},
	UploadError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UploadErrorKeySpecifier | (() => undefined | UploadErrorKeySpecifier),
		fields?: UploadErrorFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserAvatarDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserAvatarDeleteKeySpecifier | (() => undefined | UserAvatarDeleteKeySpecifier),
		fields?: UserAvatarDeleteFieldPolicy,
	},
	UserAvatarUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserAvatarUpdateKeySpecifier | (() => undefined | UserAvatarUpdateKeySpecifier),
		fields?: UserAvatarUpdateFieldPolicy,
	},
	UserBulkSetActive?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserBulkSetActiveKeySpecifier | (() => undefined | UserBulkSetActiveKeySpecifier),
		fields?: UserBulkSetActiveFieldPolicy,
	},
	UserCountableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserCountableConnectionKeySpecifier | (() => undefined | UserCountableConnectionKeySpecifier),
		fields?: UserCountableConnectionFieldPolicy,
	},
	UserCountableEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserCountableEdgeKeySpecifier | (() => undefined | UserCountableEdgeKeySpecifier),
		fields?: UserCountableEdgeFieldPolicy,
	},
	UserPermission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserPermissionKeySpecifier | (() => undefined | UserPermissionKeySpecifier),
		fields?: UserPermissionFieldPolicy,
	},
	VerifyToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VerifyTokenKeySpecifier | (() => undefined | VerifyTokenKeySpecifier),
		fields?: VerifyTokenFieldPolicy,
	},
	Webhook?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookKeySpecifier | (() => undefined | WebhookKeySpecifier),
		fields?: WebhookFieldPolicy,
	},
	WebhookCreate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookCreateKeySpecifier | (() => undefined | WebhookCreateKeySpecifier),
		fields?: WebhookCreateFieldPolicy,
	},
	WebhookDelete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookDeleteKeySpecifier | (() => undefined | WebhookDeleteKeySpecifier),
		fields?: WebhookDeleteFieldPolicy,
	},
	WebhookError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookErrorKeySpecifier | (() => undefined | WebhookErrorKeySpecifier),
		fields?: WebhookErrorFieldPolicy,
	},
	WebhookEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookEventKeySpecifier | (() => undefined | WebhookEventKeySpecifier),
		fields?: WebhookEventFieldPolicy,
	},
	WebhookEventAsync?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookEventAsyncKeySpecifier | (() => undefined | WebhookEventAsyncKeySpecifier),
		fields?: WebhookEventAsyncFieldPolicy,
	},
	WebhookEventSync?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookEventSyncKeySpecifier | (() => undefined | WebhookEventSyncKeySpecifier),
		fields?: WebhookEventSyncFieldPolicy,
	},
	WebhookUpdate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WebhookUpdateKeySpecifier | (() => undefined | WebhookUpdateKeySpecifier),
		fields?: WebhookUpdateFieldPolicy,
	},
	_Service?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _ServiceKeySpecifier | (() => undefined | _ServiceKeySpecifier),
		fields?: _ServiceFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;