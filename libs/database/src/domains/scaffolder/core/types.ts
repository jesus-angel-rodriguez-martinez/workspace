import { type AbstractPathService } from '@domains/path';

export interface IScaffolderServiceOptions {
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}
