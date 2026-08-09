import { type AbstractApiMapper } from '@domains/api';

export interface IApiMapperConfiguration {
  /**
   * Responsible for mapping domain errors to their API errors.
   */
  mappers: AbstractApiMapper[];
}
