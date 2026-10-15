import { type AbstractApiMapper } from '@domains/api';

export interface IApiMapperOptions {
  /**
   * Responsible for mapping domain errors to their API errors.
   */
  readonly mappers: AbstractApiMapper[];
}
