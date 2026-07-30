import {
  AbstractAuthenticationApp,
  type IAuthenticationAppConfiguration,
  type IUserCredentials,
  WrongCredentialsError
} from '@domains/authentication';
import { type ICreateUser } from '@domains/users';
import { type AuthenticationToken } from '@libs/security';

export class AuthenticationApp extends AbstractAuthenticationApp {
  public constructor(configuration: IAuthenticationAppConfiguration) {
    super(configuration);
  }

  public async logIn(userCredentials: IUserCredentials): Promise<AuthenticationToken> {
    const { password, username } = userCredentials;

    const userModel = await this.usersRepository.findOne({
      username
    });
    if (!userModel) {
      throw new WrongCredentialsError();
    }

    const areCredentialsValid = await this.cryptographyService.verifyPassword(
      password,
      userModel.salt,
      userModel.password
    );
    if (!areCredentialsValid) {
      throw new WrongCredentialsError();
    }

    const token = this.tokenService.generateToken(userModel.id);
    return token;
  }

  public async signUp(payload: ICreateUser): Promise<AuthenticationToken> {
    const secureUser = await this.usersApp.create(payload);

    const token = this.tokenService.generateToken(secureUser.id);
    return token;
  }
}
