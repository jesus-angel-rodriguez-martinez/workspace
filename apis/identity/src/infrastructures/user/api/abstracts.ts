import { type UserApiError } from '@infrastructures/user';
import { AbstractApiMapper } from '@libs/api';
import { type KernelError } from '@libs/kernel';

/**
 * Abstract base class for the User API mapper.
 */
export abstract class AbstractUserApiMapper extends AbstractApiMapper {
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
  public abstract override toApiError(error: KernelError): UserApiError | undefined;
}
