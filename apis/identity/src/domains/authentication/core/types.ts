import { type IUser } from '@domains/user';
import { type InferKernelError } from '@libs/kernel';
import { type EncodedToken } from '@libs/security';

/**
 * Represents the complete list of authentication domain errors.
 */
export type AuthenticationError = InferKernelError<typeof import('@domains/authentication/core/errors')>;

/**
 * Represents the pair of tokens issued to an authenticated user.
 */
export interface IAuthenticationTokens {
  /**
   * The short-lived token presented to authorize requests.
   */
  accessToken: EncodedToken;
  /**
   * The long-lived token presented only to obtain a new access token.
   */
  refreshToken: EncodedToken;
}

/**
 * Represents the data required to refresh an authentication.
 */
export interface IRefreshCredentials extends Pick<IAuthenticationTokens, 'refreshToken'> {}

/**
 * Represents the data required to authenticate a user.
 */
export interface IUserCredentials extends Pick<IUser, 'password' | 'username'> {}
