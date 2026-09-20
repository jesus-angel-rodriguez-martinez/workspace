/**
 * The string representation of the issued authentication token.
 */
export type AuthenticationToken = string;

export interface ITokenPayload {
  /**
   * The expiration time, in seconds since the Unix epoch.
   */
  exp: number;
  /**
   * The time at which the token was issued, in seconds since the Unix epoch.
   */
  iat: number;
  /**
   * The unique identifier of the user.
   */
  sub: string;
}

export interface ITokenServiceConfiguration {
  /**
   * The signing algorithm to use.
   */
  readonly algorithm: 'HS256';
  /**
   * The token expiration time in seconds.
   */
  readonly expiresIn: number;
  /**
   * The secret key used to sign tokens.
   */
  readonly secret: string;
}
