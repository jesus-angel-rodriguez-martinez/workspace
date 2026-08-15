import {
  type UserAlreadyExistsError,
  type UserNameConsecutiveWhitespaceError,
  type UserNameEndsWithWhitespaceError,
  type UserNameInvalidCharactersError,
  type UserNameInvalidTypeError,
  type UserNameLengthOutOfRangeError,
  type UserNameStartsWithWhitespaceError,
  type UserNotFoundError,
  type UserPasswordInvalidTypeError,
  type UserPasswordLengthOutOfRangeError,
  type UserPasswordMissingLowercaseCharacterError,
  type UserPasswordMissingNumericDigitError,
  type UserPasswordMissingUppercaseCharacterError,
  type UserUnauthorizedError,
  type UserUsernameInvalidCharactersError,
  type UserUsernameInvalidTypeError,
  type UserUsernameLengthOutOfRangeError
} from '@domains/user';

/**
 * Represents the data required to create a new user.
 */
export interface ICreateUser extends Pick<IUser, 'name' | 'password' | 'username'> {}

/**
 * Represents a user with sensitive fields removed for secure usage.
 */
export interface ISecureUser extends Omit<IUser, keyof Pick<IUser, 'password'>> {}

/**
 * Represents a user with sensitive fields.
 */
export interface IUser {
  /**
   * A brief description of the user.
   */
  about: string;
  /**
   * The unique identifier of the user.
   */
  id: string;
  /**
   * The full name of the user.
   */
  name: string;
  /**
   * The password of the user used for authentication.
   */
  password: string;
  /**
   * The username of the user.
   */
  username: string;
}

export type UserError =
  | UserAlreadyExistsError
  | UserNameConsecutiveWhitespaceError
  | UserNameEndsWithWhitespaceError
  | UserNameInvalidCharactersError
  | UserNameInvalidTypeError
  | UserNameLengthOutOfRangeError
  | UserNameStartsWithWhitespaceError
  | UserNotFoundError
  | UserPasswordInvalidTypeError
  | UserPasswordLengthOutOfRangeError
  | UserPasswordMissingLowercaseCharacterError
  | UserPasswordMissingNumericDigitError
  | UserPasswordMissingUppercaseCharacterError
  | UserUnauthorizedError
  | UserUsernameInvalidCharactersError
  | UserUsernameInvalidTypeError
  | UserUsernameLengthOutOfRangeError;
