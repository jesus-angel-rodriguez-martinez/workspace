import { type InvalidRefreshTokenError, type WrongCredentialsError } from '@domains/authentication';
import { type IUser } from '@domains/user';
import { type AuthenticationToken } from '@libs/security';

/**
 * Represents the pair of tokens issued to an authenticated user.
 */
export interface IAuthenticationTokens {
  /**
   * The short-lived token presented to authorize requests.
   */
  accessToken: AuthenticationToken;
  /**
   * The long-lived token presented only to obtain a new access token.
   */
  refreshToken: AuthenticationToken;
}

/**
 * Represents the data required to refresh an authentication.
 */
export interface IRefreshCredentials extends Pick<IAuthenticationTokens, 'refreshToken'> {}

/**
 * Represents the data required to authenticate a user.
 */
export interface IUserCredentials extends Pick<IUser, 'password' | 'username'> {}

/**
 * Represents the complete list of authentication domain errors.
 */
export type AuthenticationError = InvalidRefreshTokenError | WrongCredentialsError;
