import {
  AbstractAuthenticationApp,
  type IAuthenticationAppOptions,
  type IAuthenticationTokens,
  InvalidRefreshTokenError,
  type IRefreshCredentials,
  type IUserCredentials,
  WrongCredentialsError
} from '@domains/authentication';
import { type ICreateUser } from '@domains/user';

export class AuthenticationApp extends AbstractAuthenticationApp {
  public constructor(options: IAuthenticationAppOptions) {
    super(options);
  }

  public async logIn(userCredentials: IUserCredentials): Promise<IAuthenticationTokens> {
    this.userCredentialsValidator.validate(userCredentials);

    const { password, username } = userCredentials;

    const userModel = await this.userRepository.findOne({
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

    const authenticationTokens = this.generateTokens(userModel.id);
    return authenticationTokens;
  }

  public async refresh(refreshCredentials: IRefreshCredentials): Promise<IAuthenticationTokens> {
    const { refreshToken } = refreshCredentials;

    const { sub } = this.refreshTokenService.verifyToken(refreshToken);

    const userModel = await this.userRepository.findOne({
      id: sub
    });
    if (!userModel) {
      throw new InvalidRefreshTokenError();
    }

    const accessToken = this.accessTokenService.issueToken(userModel.id);

    const authenticationTokens: IAuthenticationTokens = {
      accessToken,
      refreshToken
    };
    return authenticationTokens;
  }

  public async signUp(payload: ICreateUser): Promise<IAuthenticationTokens> {
    const secureUser = await this.userApp.create(payload);

    const authenticationTokens = this.generateTokens(secureUser.id);
    return authenticationTokens;
  }

  protected generateTokens(userId: string): IAuthenticationTokens {
    const accessToken = this.accessTokenService.issueToken(userId);
    const refreshToken = this.refreshTokenService.issueToken(userId);

    const authenticationTokens: IAuthenticationTokens = {
      accessToken,
      refreshToken
    };
    return authenticationTokens;
  }
}
