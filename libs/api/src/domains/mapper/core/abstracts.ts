import { type ApiError } from '@domains/api';
import { type KernelError } from '@libs/kernel';

/**
 * Abstract base class for the API Mapper.
 */
export abstract class AbstractApiMapper {
  /**
   * Restricts instantiation to subclasses.
   */
  protected constructor() {}

  /**
   * Converts a kernel error into an API error.
   *
   * @param error - The kernel error to convert.
   *
   * @returns The corresponding API error or `undefined` when the API does not expose the error.
   */
  public abstract toApiError(error: KernelError): ApiError | undefined;
}
