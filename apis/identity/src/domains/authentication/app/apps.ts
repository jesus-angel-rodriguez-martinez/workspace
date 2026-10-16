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
import { type AuthenticationToken, type ITokenPayload } from '@libs/security';

export class AuthenticationApp extends AbstractAuthenticationApp {
  public constructor(options: IAuthenticationAppOptions) {
    super(options);
  }

  public async logIn(userCredentials: IUserCredentials): Promise<IAuthenticationTokens> {
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

    const accessToken = this.accessTokenService.generateToken(userModel.id);
    return { accessToken, refreshToken };
  }

  public async signUp(payload: ICreateUser): Promise<IAuthenticationTokens> {
    const secureUser = await this.userApp.create(payload);

    const authenticationTokens = this.generateTokens(secureUser.id);
    return authenticationTokens;
  }

  protected generateTokens(userId: string): IAuthenticationTokens {
    const accessToken = this.accessTokenService.generateToken(userId);
    const refreshToken = this.refreshTokenService.generateToken(userId);
    return { accessToken, refreshToken };
  }

  protected verifyRefreshToken(refreshToken: AuthenticationToken): ITokenPayload {
    try {
      const tokenPayload = this.refreshTokenService.verifyToken(refreshToken);
      return tokenPayload;
    } catch (error) {
      throw new InvalidRefreshTokenError({ cause: error });
    }
  }
}
