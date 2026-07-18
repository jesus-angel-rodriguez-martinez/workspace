import {
  AbstractCreateUsersValidator,
  type ICreateUser,
  InvalidNameCharactersError,
  InvalidUsernameCharactersError,
  NameEndsWithWhitespaceError,
  NameLengthOutOfRangeError,
  NameStartsWithWhitespaceError,
  PasswordLengthOutOfRangeError,
  USER_RULES,
  UserMissingLowercaseCharacterError,
  UserMissingNumericDigitError,
  UserMissingUppercaseCharacterError,
  UsernameLengthOutOfRangeError
} from '@domains/users';

export class CreateUsersValidator extends AbstractCreateUsersValidator {
  public constructor() {
    super();
  }

  public validate(payload: ICreateUser): void {
    this.validateName(payload.name);
    this.validateUsername(payload.username);
    this.validatePassword(payload.password);
  }

  protected validateName(name: string): void {
    const { MAX_LENGTH, MIN_LENGTH, REGEX_PATTERNS } = USER_RULES.name;
    const { ALLOWED_CHARACTERS } = REGEX_PATTERNS;

    const length = name.length;
    if (length < MIN_LENGTH || length > MAX_LENGTH) {
      throw new NameLengthOutOfRangeError(length);
    }

    const whiteSpace = ' ';
    if (name.startsWith(whiteSpace)) {
      throw new NameStartsWithWhitespaceError();
    }
    if (name.endsWith(whiteSpace)) {
      throw new NameEndsWithWhitespaceError();
    }

    if (!ALLOWED_CHARACTERS.test(name)) {
      throw new InvalidNameCharactersError();
    }
  }

  protected validatePassword(password: string): void {
    const { MAX_LENGTH, MIN_LENGTH, REGEX_PATTERNS } = USER_RULES.password;
    const { HAS_LOWERCASE, HAS_NUMBER, HAS_UPPERCASE } = REGEX_PATTERNS;

    const length = password.length;
    if (length < MIN_LENGTH || length > MAX_LENGTH) {
      throw new PasswordLengthOutOfRangeError(length);
    }

    if (!HAS_LOWERCASE.test(password)) {
      throw new UserMissingLowercaseCharacterError();
    }
    if (!HAS_NUMBER.test(password)) {
      throw new UserMissingNumericDigitError();
    }
    if (!HAS_UPPERCASE.test(password)) {
      throw new UserMissingUppercaseCharacterError();
    }
  }

  protected validateUsername(username: string): void {
    const { MAX_LENGTH, MIN_LENGTH, REGEX_PATTERNS } = USER_RULES.username;
    const { ALLOWED_CHARACTERS } = REGEX_PATTERNS;

    const length = username.length;
    if (length < MIN_LENGTH || length > MAX_LENGTH) {
      throw new UsernameLengthOutOfRangeError(length);
    }

    if (!ALLOWED_CHARACTERS.test(username)) {
      throw new InvalidUsernameCharactersError();
    }
  }
}
