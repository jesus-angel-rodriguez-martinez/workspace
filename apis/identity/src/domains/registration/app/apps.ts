import { AbstractRegistrationApp, type IRegistrationAppConfiguration } from '@domains/registration';
import { type ICreateUser } from '@domains/users';
import { type AuthenticationToken } from '@libs/security';

export class RegistrationApp extends AbstractRegistrationApp {
  public constructor(configuration: IRegistrationAppConfiguration) {
    super(configuration);
  }

  public async register(payload: ICreateUser): Promise<AuthenticationToken> {
    const createdUser = await this.usersApp.create(payload);

    const token = this.authenticationApp.issueToken(createdUser.id);
    return token;
  }
}
