import { type ICreateUser } from '@domains/user';

/**
 * Abstract base class for validating the creation of a user.
 */
export abstract class AbstractCreateUserValidator {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Executes the full validation logic for a user.
   *
   * @param payload - Represents the data to be validated.
   */
  public abstract validate(payload: Partial<ICreateUser>): void;
  /**
   * Validates that the provided name meets all requirements.
   *
   * @param name - The full name of the user.
   */
  protected abstract validateName(name: string | undefined): void;
  /**
   * Validates that the provided password meets all requirements.
   *
   * @param password - The password of the user used for authentication.
   */
  protected abstract validatePassword(password: string | undefined): void;
  /**
   * Validates that the provided username meets all requirements.
   *
   * @param username - The username of the user.
   */
  protected abstract validateUsername(username: string | undefined): void;
}
