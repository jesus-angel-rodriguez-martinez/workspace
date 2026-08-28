/**
 * Abstract base class for scaffolder services.
 *
 * Scaffolds new migration files.
 */
export abstract class AbstractScaffolderService {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

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
   * Resolves the absolute path of the folder migration files are scaffolded into.
   *
   * @returns The absolute path migration files are scaffolded into.
   */
  protected abstract createFolderPath(): string;
  /**
   * Builds the contents every scaffolded migration file starts with.
   *
   * @returns The migration file template.
   */
  protected abstract createTemplate(): string;
}
