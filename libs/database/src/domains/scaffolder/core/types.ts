import { type AbstractPathService } from '@domains/path';

/**
 * Options to construct a scaffolder service.
 */
export interface IScaffolderServiceConfiguration {
  /**
   * Resolves the folder scaffolded migration files are written to.
   */
  readonly pathService: AbstractPathService;
}
