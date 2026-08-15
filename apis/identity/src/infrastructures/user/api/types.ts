import {
  type UserAlreadyExistsApiError,
  type UserNameConsecutiveWhitespaceApiError,
  type UserNameEndsWithWhitespaceApiError,
  type UserNameInvalidCharactersApiError,
  type UserNameInvalidTypeApiError,
  type UserNameLengthOutOfRangeApiError,
  type UserNameStartsWithWhitespaceApiError,
  type UserNotFoundApiError,
  type UserPasswordInvalidTypeApiError,
  type UserPasswordLengthOutOfRangeApiError,
  type UserPasswordMissingLowercaseCharacterApiError,
  type UserPasswordMissingNumericDigitApiError,
  type UserPasswordMissingUppercaseCharacterApiError,
  type UserUnauthorizedApiError,
  type UserUsernameInvalidCharactersApiError,
  type UserUsernameInvalidTypeApiError,
  type UserUsernameLengthOutOfRangeApiError
} from '@infrastructures/user';

export type UserApiError =
  | UserAlreadyExistsApiError
  | UserNameConsecutiveWhitespaceApiError
  | UserNameEndsWithWhitespaceApiError
  | UserNameInvalidCharactersApiError
  | UserNameInvalidTypeApiError
  | UserNameLengthOutOfRangeApiError
  | UserNameStartsWithWhitespaceApiError
  | UserNotFoundApiError
  | UserPasswordInvalidTypeApiError
  | UserPasswordLengthOutOfRangeApiError
  | UserPasswordMissingLowercaseCharacterApiError
  | UserPasswordMissingNumericDigitApiError
  | UserPasswordMissingUppercaseCharacterApiError
  | UserUnauthorizedApiError
  | UserUsernameInvalidCharactersApiError
  | UserUsernameInvalidTypeApiError
  | UserUsernameLengthOutOfRangeApiError;
