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
   * Converts a persistent kernel error into an API error.
   *
   * @returns The corresponding API error.
   */
  public abstract toApiError(error: KernelError): ApiError | undefined;
}
