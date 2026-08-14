import {
  type UserError,
  UserAlreadyExistsError,
  UserNameConsecutiveWhitespaceError,
  UserNameEndsWithWhitespaceError,
  UserNameInvalidCharactersError,
  UserNameLengthOutOfRangeError,
  UserNameStartsWithWhitespaceError,
  UserNotFoundError,
  UserPasswordLengthOutOfRangeError,
  UserPasswordMissingLowercaseCharacterError,
  UserPasswordMissingNumericDigitError,
  UserPasswordMissingUppercaseCharacterError,
  UserUnauthorizedError,
  UserUsernameInvalidCharactersError,
  UserUsernameLengthOutOfRangeError
} from '@domains/user';
import {
  AbstractUserApiMapper,
  UserAlreadyExistsApiError,
  type UserApiError,
  UserNameConsecutiveWhitespaceApiError,
  UserNameEndsWithWhitespaceApiError,
  UserNameInvalidCharactersApiError,
  UserNameLengthOutOfRangeApiError,
  UserNameStartsWithWhitespaceApiError,
  UserNotFoundApiError,
  UserPasswordLengthOutOfRangeApiError,
  UserPasswordMissingLowercaseCharacterApiError,
  UserPasswordMissingNumericDigitApiError,
  UserPasswordMissingUppercaseCharacterApiError,
  UserUnauthorizedApiError,
  UserUsernameInvalidCharactersApiError,
  UserUsernameLengthOutOfRangeApiError
} from '@infrastructures/user';

export class UserApiMapper extends AbstractUserApiMapper {
  public constructor() {
    super();
  }

  public toApiError(error: UserError): UserApiError | undefined {
    if (error instanceof UserAlreadyExistsError) {
      return new UserAlreadyExistsApiError(error);
    }

    if (error instanceof UserNameConsecutiveWhitespaceError) {
      return new UserNameConsecutiveWhitespaceApiError(error);
    }

    if (error instanceof UserNameEndsWithWhitespaceError) {
      return new UserNameEndsWithWhitespaceApiError(error);
    }

    if (error instanceof UserNameInvalidCharactersError) {
      return new UserNameInvalidCharactersApiError(error);
    }

    if (error instanceof UserNameLengthOutOfRangeError) {
      return new UserNameLengthOutOfRangeApiError(error);
    }

    if (error instanceof UserNameStartsWithWhitespaceError) {
      return new UserNameStartsWithWhitespaceApiError(error);
    }

    if (error instanceof UserNotFoundError) {
      return new UserNotFoundApiError(error);
    }

    if (error instanceof UserPasswordLengthOutOfRangeError) {
      return new UserPasswordLengthOutOfRangeApiError(error);
    }

    if (error instanceof UserPasswordMissingLowercaseCharacterError) {
      return new UserPasswordMissingLowercaseCharacterApiError(error);
    }

    if (error instanceof UserPasswordMissingNumericDigitError) {
      return new UserPasswordMissingNumericDigitApiError(error);
    }

    if (error instanceof UserPasswordMissingUppercaseCharacterError) {
      return new UserPasswordMissingUppercaseCharacterApiError(error);
    }

    if (error instanceof UserUnauthorizedError) {
      return new UserUnauthorizedApiError(error);
    }

    if (error instanceof UserUsernameInvalidCharactersError) {
      return new UserUsernameInvalidCharactersApiError(error);
    }

    if (error instanceof UserUsernameLengthOutOfRangeError) {
      return new UserUsernameLengthOutOfRangeApiError(error);
    }

    const exhaustiveCheck: never = error;
    void exhaustiveCheck;

    return undefined;
  }
}
