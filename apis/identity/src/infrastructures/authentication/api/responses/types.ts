import { type AuthenticationToken } from '@libs/security';

export interface IAuthenticationTokenResponse {
  /**
   * The authentication token issued for the user.
   */
  token: AuthenticationToken;
}
