import { type ApiErrorMappings } from '@domains/api';

export interface IApiMapperOptions {
  /**
   * Describes how each domain error code is exposed by the API.
   */
  readonly errorMappings: ApiErrorMappings;
}
