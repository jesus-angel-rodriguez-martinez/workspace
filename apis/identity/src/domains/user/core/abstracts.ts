import { type ICreateUser } from '@domains/user';

/**
 * Abstract base class for validating the creation of a user.
 */
export abstract class AbstractCreateUserValidator {
  /**
   * Restricts instantiation to subclasses.
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
   *
   * @throws {UserNameConsecutiveWhitespaceError} When the name contains consecutive whitespace.
   * @throws {UserNameEndsWithWhitespaceError} When the name ends with whitespace.
   * @throws {UserNameInvalidCharactersError} When the name contains characters that are not allowed.
   * @throws {UserNameInvalidTypeError} When the name is not a string.
   * @throws {UserNameLengthOutOfRangeError} When the name length is out of the allowed range.
   * @throws {UserNameStartsWithWhitespaceError} When the name starts with whitespace.
   */
  protected abstract validateName(name: string | undefined): void;
  /**
   * Validates that the provided password meets all requirements.
   *
   * @param password - The password of the user used for authentication.
   *
   * @throws {UserPasswordInvalidTypeError} When the password is not a string.
   * @throws {UserPasswordLengthOutOfRangeError} When the password length is out of the allowed range.
   * @throws {UserPasswordMissingLowercaseCharacterError} When the password has no lowercase character.
   * @throws {UserPasswordMissingNumericDigitError} When the password has no numeric digit.
   * @throws {UserPasswordMissingUppercaseCharacterError} When the password has no uppercase character.
   */
  protected abstract validatePassword(password: string | undefined): void;
  /**
   * Validates that the provided username meets all requirements.
   *
   * @param username - The username of the user.
   *
   * @throws {UserUsernameConsecutiveHyphensError} When the username contains consecutive hyphens.
   * @throws {UserUsernameEndsWithHyphenError} When the username ends with a hyphen.
   * @throws {UserUsernameInvalidCharactersError} When the username contains characters that are not allowed.
   * @throws {UserUsernameInvalidTypeError} When the username is not a string.
   * @throws {UserUsernameLengthOutOfRangeError} When the username length is out of the allowed range.
   * @throws {UserUsernameStartsWithHyphenError} When the username starts with a hyphen.
   */
  protected abstract validateUsername(username: string | undefined): void;
}
