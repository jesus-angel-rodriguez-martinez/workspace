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
   * Resolves the absolute path of a certificate file.
   *
   * @param certificateFileName - The file name of the certificate.
   *
   * @returns The absolute path of the certificate file.
   */
  public abstract resolveCertificateFile(certificateFileName: string): string;
  /**
   * Resolves the absolute path of the folder certificate files live in.
   *
   * @returns The absolute path certificate files live in.
   */
  public abstract resolveCertificateFolder(): string;
  /**
   * Resolves the absolute path of a migration file.
   *
   * @param migrationFileName - The file name of the migration.
   *
   * @returns The absolute path of the migration file.
   */
  public abstract resolveMigrationFile(migrationFileName: string): string;
  /**
   * Resolves the absolute path of the folder migration files live in.
   *
   * @returns The absolute path migration files live in.
   */
  public abstract resolveMigrationFolder(): string;
}
