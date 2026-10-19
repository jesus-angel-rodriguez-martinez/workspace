import { type AuthenticationError } from '@domains/authentication';
import { type ApiErrorMappings, STATUS_CODE } from '@libs/api';
import { type TokenError } from '@libs/security';

/**
 * Describes how each authentication domain error is exposed by the API.
 */
export const AUTHENTICATION_API_ERROR_MAPPINGS: ApiErrorMappings<AuthenticationError> = {
  'AUTHENTICATION.INVALID_REFRESH_TOKEN': { status: `${STATUS_CODE.UNAUTHORIZED}` },
  'AUTHENTICATION.WRONG_CREDENTIALS': { status: `${STATUS_CODE.UNAUTHORIZED}` }
};

/**
 * Describes how each token domain error is exposed by the API.
 */
export const TOKEN_API_ERROR_MAPPINGS: ApiErrorMappings<TokenError> = {
  'TOKEN.EXPIRY': { status: `${STATUS_CODE.UNAUTHORIZED}` },
  'TOKEN.INVALID_CONFIGURATION': null,
  'TOKEN.INVALID_EXPIRES_IN': null,
  'TOKEN.ISSUANCE': null,
  'TOKEN.VALIDATION': { status: `${STATUS_CODE.UNAUTHORIZED}` },
  'TOKEN.WEAK_SECRET': null
};
