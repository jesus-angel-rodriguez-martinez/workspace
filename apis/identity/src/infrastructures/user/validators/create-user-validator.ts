import {
  AbstractCreateUserValidator,
  type ICreateUser,
  USER_RULES,
  UserNameConsecutiveWhitespaceError,
  UserNameEndsWithWhitespaceError,
  UserNameInvalidCharactersError,
  UserNameInvalidTypeError,
  UserNameLengthOutOfRangeError,
  UserNameStartsWithWhitespaceError,
  UserPasswordInvalidTypeError,
  UserPasswordLengthOutOfRangeError,
  UserPasswordMissingLowercaseCharacterError,
  UserPasswordMissingNumericDigitError,
  UserPasswordMissingUppercaseCharacterError,
  UserUsernameInvalidCharactersError,
  UserUsernameInvalidTypeError,
  UserUsernameLengthOutOfRangeError
} from '@domains/user';

export class CreateUserValidator extends AbstractCreateUserValidator {
  public constructor() {
    super();
  }

  public validate(payload: Partial<ICreateUser> = {}): void {
    this.validateName(payload.name);
    this.validateUsername(payload.username);
    this.validatePassword(payload.password);
  }

  protected validateName(name: string | undefined): void {
    if (typeof name !== 'string') {
      throw new UserNameInvalidTypeError();
    }

    const { MAX_LENGTH, MIN_LENGTH, REGEX_PATTERNS } = USER_RULES.name;
    const { ALLOWED_CHARACTERS, CONSECUTIVE_WHITESPACE } = REGEX_PATTERNS;

    const length = name.length;
    if (length < MIN_LENGTH || length > MAX_LENGTH) {
      throw new UserNameLengthOutOfRangeError(length);
    }

    const whiteSpace = ' ';
    if (name.startsWith(whiteSpace)) {
      throw new UserNameStartsWithWhitespaceError();
    }
    if (name.endsWith(whiteSpace)) {
      throw new UserNameEndsWithWhitespaceError();
    }

    if (CONSECUTIVE_WHITESPACE.test(name)) {
      throw new UserNameConsecutiveWhitespaceError();
    }
    if (!ALLOWED_CHARACTERS.test(name)) {
      throw new UserNameInvalidCharactersError();
    }
  }

  protected validatePassword(password: string | undefined): void {
    if (typeof password !== 'string') {
      throw new UserPasswordInvalidTypeError();
    }

    const { MAX_LENGTH, MIN_LENGTH, REGEX_PATTERNS } = USER_RULES.password;
    const { HAS_LOWERCASE, HAS_NUMBER, HAS_UPPERCASE } = REGEX_PATTERNS;

    const length = password.length;
    if (length < MIN_LENGTH || length > MAX_LENGTH) {
      throw new UserPasswordLengthOutOfRangeError(length);
    }

    if (!HAS_LOWERCASE.test(password)) {
      throw new UserPasswordMissingLowercaseCharacterError();
    }
    if (!HAS_NUMBER.test(password)) {
      throw new UserPasswordMissingNumericDigitError();
    }
    if (!HAS_UPPERCASE.test(password)) {
      throw new UserPasswordMissingUppercaseCharacterError();
    }
  }

  protected validateUsername(username: string | undefined): void {
    if (typeof username !== 'string') {
      throw new UserUsernameInvalidTypeError();
    }

    const { MAX_LENGTH, MIN_LENGTH, REGEX_PATTERNS } = USER_RULES.username;
    const { ALLOWED_CHARACTERS } = REGEX_PATTERNS;

    const length = username.length;
    if (length < MIN_LENGTH || length > MAX_LENGTH) {
      throw new UserUsernameLengthOutOfRangeError(length);
    }

    if (!ALLOWED_CHARACTERS.test(username)) {
      throw new UserUsernameInvalidCharactersError();
    }
  }
}
