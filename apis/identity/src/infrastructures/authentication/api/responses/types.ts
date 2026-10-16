import { type AuthenticationToken } from '@libs/security';

export interface IAuthenticationTokensResponse {
  /**
   * The short-lived token presented to authorize requests.
   */
  accessToken: AuthenticationToken;
  /**
   * The long-lived token presented only to obtain a new access token.
   */
  refreshToken: AuthenticationToken;
}
