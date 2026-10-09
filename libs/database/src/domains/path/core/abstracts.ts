/**
 * Abstract base class for path services.
 *
 * Resolves the absolute filesystem paths the toolkit reads from and writes to.
 */
export abstract class AbstractPathService {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Resolves the absolute path of the folder migration files live in.
   *
   * @returns The absolute path migration files live in.
   */
  public abstract resolveMigrationFolder(): string;
}
