import { type AuthenticationError } from '@domains/authentication';
import { type ApiErrorMappings, STATUS_CODE } from '@libs/api';

/**
 * Describes how each authentication domain error is exposed by the API.
 */
export const AUTHENTICATION_API_ERROR_MAPPINGS: ApiErrorMappings<AuthenticationError> = {
  'AUTHENTICATION.INVALID_REFRESH_TOKEN': { status: `${STATUS_CODE.UNAUTHORIZED}` },
  'AUTHENTICATION.WRONG_CREDENTIALS': { status: `${STATUS_CODE.UNAUTHORIZED}` }
};
