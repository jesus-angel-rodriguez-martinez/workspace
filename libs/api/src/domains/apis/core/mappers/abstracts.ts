import { type ApiError } from '@domains/apis';
import { type CoreError } from '@libs/core';

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
  public abstract toApiError(error: CoreError): ApiError | undefined;
}
