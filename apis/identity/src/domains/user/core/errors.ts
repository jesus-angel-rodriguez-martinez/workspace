import { USER_RULES } from '@domains/user';
import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when a requested user already exists in the system.
 */
export class UserAlreadyExistsError extends KernelError {
  public readonly code = 'USER.ALREADY_EXISTS';
  public readonly title = 'User already exists';

  constructor(username: string, options: IKernelErrorOptions = {}) {
    super(`The requested username '${username}' is already in use.`, options);
  }
}

/**
 * Error thrown when a name contains two or more consecutive whitespace characters.
 */
export class UserNameConsecutiveWhitespaceError extends KernelError {
  public readonly code = 'USER.NAME_CONSECUTIVE_WHITESPACE';
  public readonly title = 'Consecutive whitespace in name';

  constructor(options: IKernelErrorOptions = {}) {
    super('The name must not contain consecutive whitespace characters.', options);
  }
}

/**
 * Error thrown when a name ends with a whitespace character.
 */
export class UserNameEndsWithWhitespaceError extends KernelError {
  public readonly code = 'USER.NAME_ENDS_WITH_WHITESPACE';
  public readonly title = 'Name ends with whitespace';

  constructor(options: IKernelErrorOptions = {}) {
    super('The name must not end with a whitespace character.', options);
  }
}

/**
 * Error thrown when a name contains characters that are not allowed.
 */
export class UserNameInvalidCharactersError extends KernelError {
  public readonly code = 'USER.NAME_INVALID_CHARACTERS';
  public readonly title = 'Invalid name characters';

  constructor(options: IKernelErrorOptions = {}) {
    super('The name may only contain letters, spaces, and apostrophes.', options);
  }
}

/**
 * Error thrown when a name is not a string.
 */
export class UserNameInvalidTypeError extends KernelError {
  public readonly code = 'USER.NAME_INVALID_TYPE';
  public readonly title = 'Invalid name type';

  constructor(options: IKernelErrorOptions = {}) {
    super('The name must be a string.', options);
  }
}

/**
 * Error thrown when a provided name's length is outside the allowed range.
 */
export class UserNameLengthOutOfRangeError extends KernelError {
  public readonly code = 'USER.NAME_LENGTH_OUT_OF_RANGE';
  public readonly title = 'Invalid name length';

  constructor(length: number, options: IKernelErrorOptions = {}) {
    const isSingular = length === 1;
    super(
      `The provided name has '${length}' ${isSingular ? 'character' : 'characters'}, but it must be between '${USER_RULES.name.MIN_LENGTH}' and '${USER_RULES.name.MAX_LENGTH}' characters long.`,
      options
    );
  }
}

/**
 * Error thrown when a name starts with a whitespace character.
 */
export class UserNameStartsWithWhitespaceError extends KernelError {
  public readonly code = 'USER.NAME_STARTS_WITH_WHITESPACE';
  public readonly title = 'Name starts with whitespace';

  constructor(options: IKernelErrorOptions = {}) {
    super('The name must not start with a whitespace character.', options);
  }
}

/**
 * Error thrown when a requested user is not found in the system.
 */
export class UserNotFoundError extends KernelError {
  public readonly code = 'USER.NOT_FOUND';
  public readonly title = 'User not found';

  constructor(username: string, options: IKernelErrorOptions = {}) {
    super(`The requested user '${username}' could not be found.`, options);
  }
}

/**
 * Error thrown when a password is not a string.
 */
export class UserPasswordInvalidTypeError extends KernelError {
  public readonly code = 'USER.PASSWORD_INVALID_TYPE';
  public readonly title = 'Invalid password type';

  constructor(options: IKernelErrorOptions = {}) {
    super('The password must be a string.', options);
  }
}

/**
 * Error thrown when a provided password's length is outside the allowed range.
 */
export class UserPasswordLengthOutOfRangeError extends KernelError {
  public readonly code = 'USER.PASSWORD_LENGTH_OUT_OF_RANGE';
  public readonly title = 'Invalid password length';

  constructor(length: number, options: IKernelErrorOptions = {}) {
    const isSingular = length === 1;
    super(
      `The provided password has '${length}' ${isSingular ? 'character' : 'characters'}, but it must be between '${USER_RULES.password.MIN_LENGTH}' and '${USER_RULES.password.MAX_LENGTH}' characters long.`,
      options
    );
  }
}

/**
 * Error thrown when a password does not contain at least one lowercase character.
 */
export class UserPasswordMissingLowercaseCharacterError extends KernelError {
  public readonly code = 'USER.PASSWORD_MISSING_LOWERCASE_CHARACTER';
  public readonly title = 'Password missing lowercase character';

  constructor(options: IKernelErrorOptions = {}) {
    super('The password must contain at least one lowercase character.', options);
  }
}

/**
 * Error thrown when a password does not contain at least one numeric digit.
 */
export class UserPasswordMissingNumericDigitError extends KernelError {
  public readonly code = 'USER.PASSWORD_MISSING_NUMERIC_DIGIT';
  public readonly title = 'Password missing numeric digit';

  constructor(options: IKernelErrorOptions = {}) {
    super('The password must contain at least one numeric digit.', options);
  }
}

/**
 * Error thrown when a password does not contain at least one uppercase character.
 */
export class UserPasswordMissingUppercaseCharacterError extends KernelError {
  public readonly code = 'USER.PASSWORD_MISSING_UPPERCASE_CHARACTER';
  public readonly title = 'Password missing uppercase character';

  constructor(options: IKernelErrorOptions = {}) {
    super('The password must contain at least one uppercase character.', options);
  }
}

/**
 * Error thrown when a user is not authorized to perform a certain action.
 */
export class UserUnauthorizedError extends KernelError {
  public readonly code = 'USER.UNAUTHORIZED';
  public readonly title = 'Unauthorized';

  constructor(options: IKernelErrorOptions = {}) {
    super('You do not have permission to perform this action.', options);
  }
}

/**
 * Error thrown when a username contains two or more consecutive hyphens.
 */
export class UserUsernameConsecutiveHyphensError extends KernelError {
  public readonly code = 'USER.USERNAME_CONSECUTIVE_HYPHENS';
  public readonly title = 'Consecutive hyphens in username';

  constructor(options: IKernelErrorOptions = {}) {
    super('The username must not contain consecutive hyphens.', options);
  }
}

/**
 * Error thrown when a username ends with a hyphen.
 */
export class UserUsernameEndsWithHyphenError extends KernelError {
  public readonly code = 'USER.USERNAME_ENDS_WITH_HYPHEN';
  public readonly title = 'Username ends with hyphen';

  constructor(options: IKernelErrorOptions = {}) {
    super('The username must not end with a hyphen.', options);
  }
}

/**
 * Error thrown when a username contains characters that are not allowed.
 */
export class UserUsernameInvalidCharactersError extends KernelError {
  public readonly code = 'USER.USERNAME_INVALID_CHARACTERS';
  public readonly title = 'Invalid username characters';

  constructor(options: IKernelErrorOptions = {}) {
    super('The username may only contain letters, numbers, and hyphens.', options);
  }
}

/**
 * Error thrown when a username is not a string.
 */
export class UserUsernameInvalidTypeError extends KernelError {
  public readonly code = 'USER.USERNAME_INVALID_TYPE';
  public readonly title = 'Invalid username type';

  constructor(options: IKernelErrorOptions = {}) {
    super('The username must be a string.', options);
  }
}

/**
 * Error thrown when a provided username's length is outside the allowed range.
 */
export class UserUsernameLengthOutOfRangeError extends KernelError {
  public readonly code = 'USER.USERNAME_LENGTH_OUT_OF_RANGE';
  public readonly title = 'Invalid username length';

  constructor(length: number, options: IKernelErrorOptions = {}) {
    const isSingular = length === 1;
    super(
      `The provided username has '${length}' ${isSingular ? 'character' : 'characters'}, but it must be between '${USER_RULES.username.MIN_LENGTH}' and '${USER_RULES.username.MAX_LENGTH}' characters long.`,
      options
    );
  }
}

/**
 * Error thrown when a username starts with a hyphen.
 */
export class UserUsernameStartsWithHyphenError extends KernelError {
  public readonly code = 'USER.USERNAME_STARTS_WITH_HYPHEN';
  public readonly title = 'Username starts with hyphen';

  constructor(options: IKernelErrorOptions = {}) {
    super('The username must not start with a hyphen.', options);
  }
}
