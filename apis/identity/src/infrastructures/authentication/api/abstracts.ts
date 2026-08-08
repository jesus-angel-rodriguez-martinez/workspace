import { type AuthenticationApiError } from '@infrastructures/authentication';
import { type CoreError } from '@libs/core';

/**
 * Abstract base class for the Authentication API mapper.
 */
export abstract class AbstractAuthenticationApiMapper {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Converts a domain error into its authentication API error representation.
   *
   * @param error - The domain error to convert.
   *
   * @returns The corresponding authentication API error, or `undefined` if the error does not belong to the authentication domain.
   */
  public abstract toApiError(error: CoreError): AuthenticationApiError | undefined;
}
