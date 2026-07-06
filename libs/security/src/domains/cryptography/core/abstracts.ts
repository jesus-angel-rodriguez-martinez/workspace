import { type ICryptographyServiceConfiguration } from '@domains/cryptography';

export abstract class AbstractCryptographyService {
  /**
   * Cryptography configuration options.
   */
  protected readonly configuration: ICryptographyServiceConfiguration;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Cryptography configuration options.
   */
  protected constructor(configuration: ICryptographyServiceConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Generates a cryptographically secure random salt using the configured salt length.
   *
   * @returns A promise that resolves to a securely generated salt value.
   */
  public abstract generateSalt(): Promise<Buffer>;
  /**
   * Derives a cryptographic hash from the provided password and salt.
   *
   * @param password - The plain-text password to hash.
   * @param salt - The cryptographic salt used in the hashing process.
   *
   * @returns A promise that resolves to the derived password hash.
   */
  public abstract hashPassword(password: string, salt: Buffer): Promise<Buffer>;
  /**
   * Validates whether a plain-text password corresponds to a stored password hash.
   * Implementations must perform a constant-time comparison to prevent timing attacks.
   *
   * @param password - The plain-text password to validate.
   * @param salt - The salt originally used to derive the stored hash.
   * @param hashedPassword - The stored hashed password to verify against.
   *
   * @returns A promise that resolves to true if the password is valid; otherwise, false.
   */
  public abstract verifyPassword(password: string, salt: Buffer, hashedPassword: Buffer): Promise<boolean>;
}
