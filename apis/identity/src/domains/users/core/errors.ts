import { USER_RULES } from '@domains/users';
import { CoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when a requested user already exists in the system.
 */
export class UserAlreadyExistsError extends CoreError {
  constructor(username: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.ALREADY_EXISTS',
      detail: `The requested username '${username}' is already in use.`,
      title: 'User already exists'
    });
  }
}

/**
 * Error thrown when a name contains two or more consecutive whitespace characters.
 */
export class UserNameConsecutiveWhitespaceError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NAME_CONSECUTIVE_WHITESPACE',
      detail: 'The name must not contain consecutive whitespace characters.',
      title: 'Consecutive whitespace in name'
    });
  }
}

/**
 * Error thrown when a name ends with a whitespace character.
 */
export class UserNameEndsWithWhitespaceError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NAME_ENDS_WITH_WHITESPACE',
      detail: 'The name must not end with a whitespace character.',
      title: 'Name ends with whitespace'
    });
  }
}

/**
 * Error thrown when a name contains characters that are not allowed.
 */
export class UserNameInvalidCharactersError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NAME_INVALID_CHARACTERS',
      detail: 'The name may only contain letters, spaces, and apostrophes.',
      title: 'Invalid name characters'
    });
  }
}

/**
 * Error thrown when a provided name's length is outside the allowed range.
 */
export class UserNameLengthOutOfRangeError extends CoreError {
  constructor(length: number, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NAME_LENGTH_OUT_OF_RANGE',
      detail: `The provided name has '${length}' characters, but it must be between '${USER_RULES.name.MIN_LENGTH}' and '${USER_RULES.name.MAX_LENGTH}' characters long.`,
      title: 'Invalid name length'
    });
  }
}

/**
 * Error thrown when a name starts with a whitespace character.
 */
export class UserNameStartsWithWhitespaceError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NAME_STARTS_WITH_WHITESPACE',
      detail: 'The name must not start with a whitespace character.',
      title: 'Name starts with whitespace'
    });
  }
}

/**
 * Error thrown when a requested user is not found in the system.
 */
export class UserNotFoundError extends CoreError {
  constructor(username: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NOT_FOUND',
      detail: `The requested user '${username}' could not be found.`,
      title: 'User not found'
    });
  }
}

/**
 * Error thrown when a provided password's length is outside the allowed range.
 */
export class UserPasswordLengthOutOfRangeError extends CoreError {
  constructor(length: number, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.PASSWORD_LENGTH_OUT_OF_RANGE',
      detail: `The provided password has '${length}' characters, but it must be between '${USER_RULES.password.MIN_LENGTH}' and '${USER_RULES.password.MAX_LENGTH}' characters long.`,
      title: 'Invalid password length'
    });
  }
}

/**
 * Error thrown when a password does not contain at least one lowercase character.
 */
export class UserPasswordMissingLowercaseCharacterError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.PASSWORD_MISSING_LOWERCASE_CHARACTER',
      detail: 'The password must contain at least one lowercase character.',
      title: 'Password missing lowercase character'
    });
  }
}

/**
 * Error thrown when a password does not contain at least one numeric digit.
 */
export class UserPasswordMissingNumericDigitError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.PASSWORD_MISSING_NUMERIC_DIGIT',
      detail: 'The password must contain at least one numeric digit.',
      title: 'Password missing numeric digit'
    });
  }
}

/**
 * Error thrown when a password does not contain at least one uppercase character.
 */
export class UserPasswordMissingUppercaseCharacterError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.PASSWORD_MISSING_UPPERCASE_CHARACTER',
      detail: 'The password must contain at least one uppercase character.',
      title: 'Password missing uppercase character'
    });
  }
}

/**
 * Error thrown when a user is not authorized to perform a certain action.
 */
export class UserUnauthorizedError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.UNAUTHORIZED',
      detail: 'You do not have permission to perform this action.',
      title: 'Unauthorized'
    });
  }
}

/**
 * Error thrown when a username contains characters that are not allowed.
 */
export class UserUsernameInvalidCharactersError extends CoreError {
  constructor(options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.USERNAME_INVALID_CHARACTERS',
      detail: 'The username may only contain letters, numbers, and hyphens.',
      title: 'Invalid username characters'
    });
  }
}

/**
 * Error thrown when a provided username's length is outside the allowed range.
 */
export class UserUsernameLengthOutOfRangeError extends CoreError {
  constructor(length: number, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.USERNAME_LENGTH_OUT_OF_RANGE',
      detail: `The provided username has '${length}' characters, but it must be between '${USER_RULES.username.MIN_LENGTH}' and '${USER_RULES.username.MAX_LENGTH}' characters long.`,
      title: 'Invalid username length'
    });
  }
}
