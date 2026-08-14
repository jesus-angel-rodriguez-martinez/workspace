import {
  type UserAlreadyExistsApiError,
  type UserNameConsecutiveWhitespaceApiError,
  type UserNameEndsWithWhitespaceApiError,
  type UserNameInvalidCharactersApiError,
  type UserNameLengthOutOfRangeApiError,
  type UserNameStartsWithWhitespaceApiError,
  type UserNotFoundApiError,
  type UserPasswordLengthOutOfRangeApiError,
  type UserPasswordMissingLowercaseCharacterApiError,
  type UserPasswordMissingNumericDigitApiError,
  type UserPasswordMissingUppercaseCharacterApiError,
  type UserUnauthorizedApiError,
  type UserUsernameInvalidCharactersApiError,
  type UserUsernameLengthOutOfRangeApiError
} from '@infrastructures/user';

export type UserApiError =
  | UserAlreadyExistsApiError
  | UserNameConsecutiveWhitespaceApiError
  | UserNameEndsWithWhitespaceApiError
  | UserNameInvalidCharactersApiError
  | UserNameLengthOutOfRangeApiError
  | UserNameStartsWithWhitespaceApiError
  | UserNotFoundApiError
  | UserPasswordLengthOutOfRangeApiError
  | UserPasswordMissingLowercaseCharacterApiError
  | UserPasswordMissingNumericDigitApiError
  | UserPasswordMissingUppercaseCharacterApiError
  | UserUnauthorizedApiError
  | UserUsernameInvalidCharactersApiError
  | UserUsernameLengthOutOfRangeApiError;
