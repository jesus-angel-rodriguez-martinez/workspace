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
import { type DecodedToken, type EncodedToken } from '@libs/security';

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

    const { sub } = this.verifyRefreshToken(refreshToken);

    const userModel = await this.userRepository.findOne({
      id: sub
    });
    if (!userModel) {
      throw new InvalidRefreshTokenError();
    }

    const accessToken = this.accessTokenService.issueToken(userModel.id);
    return { accessToken, refreshToken };
  }

  public async signUp(payload: ICreateUser): Promise<IAuthenticationTokens> {
    const secureUser = await this.userApp.create(payload);

    const authenticationTokens = this.generateTokens(secureUser.id);
    return authenticationTokens;
  }

  protected generateTokens(userId: string): IAuthenticationTokens {
    const accessToken = this.accessTokenService.issueToken(userId);
    const refreshToken = this.refreshTokenService.issueToken(userId);
    return { accessToken, refreshToken };
  }

  protected verifyRefreshToken(refreshToken: EncodedToken): DecodedToken {
    try {
      const decodedToken = this.refreshTokenService.verifyToken(refreshToken);
      return decodedToken;
    } catch (error) {
      throw new InvalidRefreshTokenError({ cause: error });
    }
  }
}
