import { type IUserCredentials } from '@domains/authentication';

/**
 * Abstract base class for validating the credentials of a user.
 */
export abstract class AbstractUserCredentialsValidator {
  /**
   * Restricts instantiation to subclasses.
   */
  protected constructor() {}

  /**
   * Executes the full validation logic for the credentials.
   *
   * @param payload - Represents the data to be validated.
   */
  public abstract validate(payload: Partial<IUserCredentials>): void;
  /**
   * Validates that the provided password is well formed.
   *
   * @param password - The password of the user used for authentication.
   */
  protected abstract validatePassword(password: string | undefined): void;
  /**
   * Validates that the provided username is well formed.
   *
   * @param username - The username of the user.
   */
  protected abstract validateUsername(username: string | undefined): void;
}
