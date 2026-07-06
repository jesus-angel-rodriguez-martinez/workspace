import { type ISecureUser } from '@domains/users';

/**
 * The string representation of the issued authentication token.
 */
export type AuthenticationToken = string;

export interface ITokenPayload {
  /**
   * The expiration time.
   */
  exp: number;
  /**
   * The time at which the token was issued.
   */
  iat: number;
  /**
   * The unique identifier of the user.
   */
  sub: string;
  /**
   * The authenticated user with sensitive fields removed for secure usage.
   */
  user: ISecureUser;
}

export interface ITokenServiceConfiguration {
  /**
   * The signing algorithm to use.
   */
  algorithm: 'HS256';
  /**
   * The token expiration time in seconds.
   */
  expiresIn: number;
  /**
   * The secret key used to sign tokens.
   */
  secret: string;
}
