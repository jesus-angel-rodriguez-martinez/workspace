import { type AbstractTokenValidator } from '@domains/token';

/**
 * The decoded representation of an issued token.
 */
export type DecodedToken = IAccessToken | IRefreshToken;

/**
 * The encoded string representation of an issued token.
 */
export type EncodedToken = string;

/**
 * The purpose of the token.
 */
export type TokenType = DecodedToken['type'];

/**
 * A short-lived token, presented to authorize requests.
 */
export interface IAccessToken extends IBaseToken {
  /**
   * The purpose of the token.
   */
  type: 'access';
}

/**
 * The claims shared by every issued token.
 */
export interface IBaseToken {
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

/**
 * A long-lived token, presented only to obtain new access tokens.
 */
export interface IRefreshToken extends IBaseToken {
  /**
   * The purpose of the token.
   */
  type: 'refresh';
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
  /**
   * The purpose of the token.
   */
  readonly type: TokenType;
}

export interface ITokenServiceOptions {
  /**
   * Token configuration options.
   */
  readonly configuration: ITokenServiceConfiguration;
  /**
   * Validates the token configuration.
   */
  readonly tokenValidator: AbstractTokenValidator;
}
