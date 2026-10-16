import { type IAuthenticationTokens } from '@domains/authentication';
import { type IAuthenticationTokensResponse } from '@infrastructures/authentication';

/**
 * Abstract base class for the Authentication response mapper.
 */
export abstract class AbstractAuthenticationResponseMapper {
  /**
   * Restricts instantiation to subclasses.
   */
  protected constructor() {}

  /**
   * Converts the authentication tokens into their tokens response representation.
   *
   * @param authenticationTokens - The authentication tokens to convert.
   *
   * @returns The corresponding authentication tokens response.
   */
  public abstract toAuthenticationTokensResponse(
    authenticationTokens: IAuthenticationTokens
  ): IAuthenticationTokensResponse;
}
