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
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from '@libs/api';

/**
 * Error thrown when a requested user already exists in the system.
 */
export class UserAlreadyExistsApiError extends ConflictError {
  constructor(userAlreadyExistsError: UserAlreadyExistsError) {
    super({
      cause: userAlreadyExistsError,
      code: userAlreadyExistsError.code,
      detail: userAlreadyExistsError.detail,
      title: userAlreadyExistsError.title
    });
  }
}

/**
 * Error thrown when a name contains two or more consecutive whitespace characters.
 */
export class UserNameConsecutiveWhitespaceApiError extends BadRequestError {
  constructor(userNameConsecutiveWhitespaceError: UserNameConsecutiveWhitespaceError) {
    super({
      cause: userNameConsecutiveWhitespaceError,
      code: userNameConsecutiveWhitespaceError.code,
      detail: userNameConsecutiveWhitespaceError.detail,
      title: userNameConsecutiveWhitespaceError.title
    });
  }
}

/**
 * Error thrown when a name ends with a whitespace character.
 */
export class UserNameEndsWithWhitespaceApiError extends BadRequestError {
  constructor(userNameEndsWithWhitespaceError: UserNameEndsWithWhitespaceError) {
    super({
      cause: userNameEndsWithWhitespaceError,
      code: userNameEndsWithWhitespaceError.code,
      detail: userNameEndsWithWhitespaceError.detail,
      title: userNameEndsWithWhitespaceError.title
    });
  }
}

/**
 * Error thrown when a name contains characters that are not allowed.
 */
export class UserNameInvalidCharactersApiError extends BadRequestError {
  constructor(userNameInvalidCharactersError: UserNameInvalidCharactersError) {
    super({
      cause: userNameInvalidCharactersError,
      code: userNameInvalidCharactersError.code,
      detail: userNameInvalidCharactersError.detail,
      title: userNameInvalidCharactersError.title
    });
  }
}

/**
 * Error thrown when a name is not a string.
 */
export class UserNameInvalidTypeApiError extends BadRequestError {
  constructor(userNameInvalidTypeError: UserNameInvalidTypeError) {
    super({
      cause: userNameInvalidTypeError,
      code: userNameInvalidTypeError.code,
      detail: userNameInvalidTypeError.detail,
      title: userNameInvalidTypeError.title
    });
  }
}

/**
 * Error thrown when a provided name's length is outside the allowed range.
 */
export class UserNameLengthOutOfRangeApiError extends BadRequestError {
  constructor(userNameLengthOutOfRangeError: UserNameLengthOutOfRangeError) {
    super({
      cause: userNameLengthOutOfRangeError,
      code: userNameLengthOutOfRangeError.code,
      detail: userNameLengthOutOfRangeError.detail,
      title: userNameLengthOutOfRangeError.title
    });
  }
}

/**
 * Error thrown when a name starts with a whitespace character.
 */
export class UserNameStartsWithWhitespaceApiError extends BadRequestError {
  constructor(userNameStartsWithWhitespaceError: UserNameStartsWithWhitespaceError) {
    super({
      cause: userNameStartsWithWhitespaceError,
      code: userNameStartsWithWhitespaceError.code,
      detail: userNameStartsWithWhitespaceError.detail,
      title: userNameStartsWithWhitespaceError.title
    });
  }
}

/**
 * Error thrown when a requested user is not found in the system.
 */
export class UserNotFoundApiError extends NotFoundError {
  constructor(userNotFoundError: UserNotFoundError) {
    super({
      cause: userNotFoundError,
      code: userNotFoundError.code,
      detail: userNotFoundError.detail,
      title: userNotFoundError.title
    });
  }
}

/**
 * Error thrown when a password is not a string.
 */
export class UserPasswordInvalidTypeApiError extends BadRequestError {
  constructor(userPasswordInvalidTypeError: UserPasswordInvalidTypeError) {
    super({
      cause: userPasswordInvalidTypeError,
      code: userPasswordInvalidTypeError.code,
      detail: userPasswordInvalidTypeError.detail,
      title: userPasswordInvalidTypeError.title
    });
  }
}

/**
 * Error thrown when a provided password's length is outside the allowed range.
 */
export class UserPasswordLengthOutOfRangeApiError extends BadRequestError {
  constructor(userPasswordLengthOutOfRangeError: UserPasswordLengthOutOfRangeError) {
    super({
      cause: userPasswordLengthOutOfRangeError,
      code: userPasswordLengthOutOfRangeError.code,
      detail: userPasswordLengthOutOfRangeError.detail,
      title: userPasswordLengthOutOfRangeError.title
    });
  }
}

/**
 * Error thrown when a password does not contain at least one lowercase character.
 */
export class UserPasswordMissingLowercaseCharacterApiError extends BadRequestError {
  constructor(userPasswordMissingLowercaseCharacterError: UserPasswordMissingLowercaseCharacterError) {
    super({
      cause: userPasswordMissingLowercaseCharacterError,
      code: userPasswordMissingLowercaseCharacterError.code,
      detail: userPasswordMissingLowercaseCharacterError.detail,
      title: userPasswordMissingLowercaseCharacterError.title
    });
  }
}

/**
 * Error thrown when a password does not contain at least one numeric digit.
 */
export class UserPasswordMissingNumericDigitApiError extends BadRequestError {
  constructor(userPasswordMissingNumericDigitError: UserPasswordMissingNumericDigitError) {
    super({
      cause: userPasswordMissingNumericDigitError,
      code: userPasswordMissingNumericDigitError.code,
      detail: userPasswordMissingNumericDigitError.detail,
      title: userPasswordMissingNumericDigitError.title
    });
  }
}

/**
 * Error thrown when a password does not contain at least one uppercase character.
 */
export class UserPasswordMissingUppercaseCharacterApiError extends BadRequestError {
  constructor(userPasswordMissingUppercaseCharacterError: UserPasswordMissingUppercaseCharacterError) {
    super({
      cause: userPasswordMissingUppercaseCharacterError,
      code: userPasswordMissingUppercaseCharacterError.code,
      detail: userPasswordMissingUppercaseCharacterError.detail,
      title: userPasswordMissingUppercaseCharacterError.title
    });
  }
}

/**
 * Error thrown when a user is not authorized to perform a certain action.
 */
export class UserUnauthorizedApiError extends ForbiddenError {
  constructor(userUnauthorizedError: UserUnauthorizedError) {
    super({
      cause: userUnauthorizedError,
      code: userUnauthorizedError.code,
      detail: userUnauthorizedError.detail,
      title: userUnauthorizedError.title
    });
  }
}

/**
 * Error thrown when a username contains characters that are not allowed.
 */
export class UserUsernameInvalidCharactersApiError extends BadRequestError {
  constructor(userUsernameInvalidCharactersError: UserUsernameInvalidCharactersError) {
    super({
      cause: userUsernameInvalidCharactersError,
      code: userUsernameInvalidCharactersError.code,
      detail: userUsernameInvalidCharactersError.detail,
      title: userUsernameInvalidCharactersError.title
    });
  }
}

/**
 * Error thrown when a username is not a string.
 */
export class UserUsernameInvalidTypeApiError extends BadRequestError {
  constructor(userUsernameInvalidTypeError: UserUsernameInvalidTypeError) {
    super({
      cause: userUsernameInvalidTypeError,
      code: userUsernameInvalidTypeError.code,
      detail: userUsernameInvalidTypeError.detail,
      title: userUsernameInvalidTypeError.title
    });
  }
}

/**
 * Error thrown when a provided username's length is outside the allowed range.
 */
export class UserUsernameLengthOutOfRangeApiError extends BadRequestError {
  constructor(userUsernameLengthOutOfRangeError: UserUsernameLengthOutOfRangeError) {
    super({
      cause: userUsernameLengthOutOfRangeError,
      code: userUsernameLengthOutOfRangeError.code,
      detail: userUsernameLengthOutOfRangeError.detail,
      title: userUsernameLengthOutOfRangeError.title
    });
  }
}
