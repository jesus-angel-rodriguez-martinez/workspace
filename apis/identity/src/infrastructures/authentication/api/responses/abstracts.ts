import { type IAuthenticationTokenResponse } from '@infrastructures/authentication';
import { type AuthenticationToken } from '@libs/security';

/**
 * Abstract base class for the Authentication response mapper.
 */
export abstract class AbstractAuthenticationResponseMapper {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Converts an authentication token into its token response representation.
   *
   * @param token - The authentication token to convert.
   *
   * @returns The corresponding authentication token response.
   */
  public abstract toAuthenticationTokenResponse(token: AuthenticationToken): IAuthenticationTokenResponse;
}
