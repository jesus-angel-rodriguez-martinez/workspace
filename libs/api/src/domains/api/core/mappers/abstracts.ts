import { type ApiError } from '@domains/api';
import { type KernelError } from '@libs/kernel';

/**
 * Abstract base class for the API Mapper.
 */
export abstract class AbstractApiMapper {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Converts a persistent core error into an API error.
   *
   * @returns The corresponding API error.
   */
  public abstract toApiError(error: KernelError): ApiError | undefined;
}
