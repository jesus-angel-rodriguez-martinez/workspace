import { type AbstractPathService } from '@domains/path';
import { type IScaffolderServiceOptions } from '@domains/scaffolder';

/**
 * Abstract base class for scaffolder services.
 *
 * Scaffolds new migration files.
 */
export abstract class AbstractScaffolderService {
  /**
   * Resolves the filesystem paths.
   */
  protected readonly pathService: AbstractPathService;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Scaffolder service options.
   */
  protected constructor({ pathService }: IScaffolderServiceOptions) {
    this.pathService = pathService;
  }

  /**
   * Scaffolds a new migration file and returns its path.
   *
   * @param name - The human-readable migration name.
   *
   * @returns A promise that resolves to the path of the created migration file.
   */
  public abstract create(name: string | undefined): Promise<string>;
  /**
   * Builds the `YYYYMMDDHHMMSS_<name>.ts` file name for a new migration.
   *
   * @param name - The human-readable migration name.
   *
   * @returns The migration file name.
   */
  protected abstract createFileName(name: string): string;
  /**
   * Builds the contents every scaffolded migration file starts with.
   *
   * @returns The migration file template.
   */
  protected abstract createTemplate(): string;
}
