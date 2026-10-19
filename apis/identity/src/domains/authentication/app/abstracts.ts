import {
  type AbstractUserCredentialsValidator,
  type IAuthenticationAppOptions,
  type IAuthenticationTokens,
  type IRefreshCredentials,
  type IUserCredentials
} from '@domains/authentication';
import { type AbstractUserApp, type ICreateUser, type IUserRepository } from '@domains/user';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

/**
 * Abstract base class for the Authentication App.
 */
export abstract class AbstractAuthenticationApp {
  /**
   * Issues and verifies access tokens.
   */
  protected readonly accessTokenService: AbstractTokenService;
  /**
   * Provides cryptographic utilities.
   */
  protected readonly cryptographyService: AbstractCryptographyService;
  /**
   * Issues and verifies refresh tokens.
   */
  protected readonly refreshTokenService: AbstractTokenService;
  /**
   * Provides user use cases.
   */
  protected readonly userApp: AbstractUserApp;
  /**
   * Validates the credentials provided.
   */
  protected readonly userCredentialsValidator: AbstractUserCredentialsValidator;
  /**
   * Provides access to user data.
   */
  protected readonly userRepository: IUserRepository;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Authentication App options.
   */
  protected constructor({
    accessTokenService,
    cryptographyService,
    refreshTokenService,
    userApp,
    userCredentialsValidator,
    userRepository
  }: IAuthenticationAppOptions) {
    this.accessTokenService = accessTokenService;
    this.cryptographyService = cryptographyService;
    this.refreshTokenService = refreshTokenService;
    this.userApp = userApp;
    this.userCredentialsValidator = userCredentialsValidator;
    this.userRepository = userRepository;
  }

  /**
   * Logs a user in using their credentials.
   *
   * @param userCredentials - The credentials provided by the user.
   *
   * @returns A promise that resolves with the access and refresh tokens.
   */
  public abstract logIn(userCredentials: IUserCredentials): Promise<IAuthenticationTokens>;
  /**
   * Issues a new access token from a valid refresh token.
   * The refresh token is returned unchanged, so the session ends when it expires.
   *
   * @param refreshCredentials - The refresh token provided by the user.
   *
   * @returns A promise that resolves with the new access token and the same refresh token.
   */
  public abstract refresh(refreshCredentials: IRefreshCredentials): Promise<IAuthenticationTokens>;
  /**
   * Signs a new user up.
   *
   * @param payload - The data required to create the user.
   *
   * @returns A promise that resolves with the access and refresh tokens.
   */
  public abstract signUp(payload: ICreateUser): Promise<IAuthenticationTokens>;
}
