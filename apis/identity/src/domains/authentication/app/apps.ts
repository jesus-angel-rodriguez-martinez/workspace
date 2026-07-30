import {
  AbstractAuthenticationApp,
  type IAuthenticationAppConfiguration,
  type IUserCredentials,
  WrongCredentialsError
} from '@domains/authentication';
import { type AuthenticationToken } from '@libs/security';

export class AuthenticationApp extends AbstractAuthenticationApp {
  public constructor(configuration: IAuthenticationAppConfiguration) {
    super(configuration);
  }

  public async authenticate(userCredentials: IUserCredentials): Promise<AuthenticationToken> {
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

    const token = this.issueToken(userModel.id);
    return token;
  }

  public issueToken(userId: string): AuthenticationToken {
    const token = this.tokenService.generateToken(userId);
    return token;
  }
}
