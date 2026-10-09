import { type AbstractPathService } from '@domains/path';

/**
 * Options to construct a scaffolder service.
 */
export interface IScaffolderServiceConfiguration {
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}
