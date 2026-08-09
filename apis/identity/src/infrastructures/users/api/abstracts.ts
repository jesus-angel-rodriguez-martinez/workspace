import { type UserApiError } from '@infrastructures/users';
import { AbstractApiMapper } from '@libs/api';
import { type CoreError } from '@libs/core';

/**
 * Abstract base class for the Users API mapper.
 */
export abstract class AbstractUsersApiMapper extends AbstractApiMapper {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {
    super();
  }

  /**
   * Converts a domain error into its user API error representation.
   *
   * @param error - The domain error to convert.
   *
   * @returns The corresponding user API error, or `undefined` if the error does not belong to the users domain.
   */
  public abstract override toApiError(error: CoreError): UserApiError | undefined;
}
