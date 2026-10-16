import { type EncodedToken } from '@libs/security';

export interface IAuthenticationTokensResponse {
  /**
   * The short-lived token presented to authorize requests.
   */
  accessToken: EncodedToken;
  /**
   * The long-lived token presented only to obtain a new access token.
   */
  refreshToken: EncodedToken;
}
