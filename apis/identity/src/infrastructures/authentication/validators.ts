import { AbstractUserCredentialsValidator, type IUserCredentials } from '@domains/authentication';
import { UserPasswordInvalidTypeError, UserUsernameInvalidTypeError } from '@domains/user';

export class UserCredentialsValidator extends AbstractUserCredentialsValidator {
  public constructor() {
    super();
  }

  public validate(payload: Partial<IUserCredentials> = {}): void {
    this.validateUsername(payload.username);
    this.validatePassword(payload.password);
  }

  protected validatePassword(password: string | undefined): void {
    if (typeof password !== 'string') {
      throw new UserPasswordInvalidTypeError();
    }
  }

  protected validateUsername(username: string | undefined): void {
    if (typeof username !== 'string') {
      throw new UserUsernameInvalidTypeError();
    }
  }
}
