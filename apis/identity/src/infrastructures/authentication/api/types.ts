import {
  type InvalidRefreshTokenApiError,
  type WrongCredentialsApiError
} from '@infrastructures/authentication';

/**
 * Represents the complete list of authentication API errors.
 */
export type AuthenticationApiError = InvalidRefreshTokenApiError | WrongCredentialsApiError;
