import { type IAuthenticationAppConfiguration, type IUserCredentials } from '@domains/authentication';
import { type AbstractUserApp, type ICreateUser, type IUserRepository } from '@domains/user';
import {
  type AbstractCryptographyService,
  type AbstractTokenService,
  type AuthenticationToken
} from '@libs/security';

/**
 * Abstract base class for the Authentication App.
 */
export abstract class AbstractAuthenticationApp {
  /**
   * Provides cryptographic utilities.
   */
  protected readonly cryptographyService: AbstractCryptographyService;
  /**
   * Provides token utilities.
   */
  protected readonly tokenService: AbstractTokenService;
  /**
   * Provides user use cases.
   */
  protected readonly userApp: AbstractUserApp;
  /**
   * Provides access to user data.
   */
  protected readonly userRepository: IUserRepository;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Authentication App configuration options.
   */
  protected constructor({
    cryptographyService,
    tokenService,
    userApp,
    userRepository
  }: IAuthenticationAppConfiguration) {
    this.cryptographyService = cryptographyService;
    this.tokenService = tokenService;
    this.userApp = userApp;
    this.userRepository = userRepository;
  }

  /**
   * Logs a user in using their credentials.
   *
   * @param userCredentials - The credentials provided by the user.
   *
   * @returns A promise that resolves with the authentication token.
   */
  public abstract logIn(userCredentials: IUserCredentials): Promise<AuthenticationToken>;
  /**
   * Signs a new user up.
   *
   * @param payload - The data required to create the user.
   *
   * @returns A promise that resolves with the authentication token.
   */
  public abstract signUp(payload: ICreateUser): Promise<AuthenticationToken>;
}
