import { type AbstractPathService } from '@domains/path';

/**
 * Defines the dependencies required to create the scaffolder service.
 */
export interface IScaffolderServiceOptions {
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}
