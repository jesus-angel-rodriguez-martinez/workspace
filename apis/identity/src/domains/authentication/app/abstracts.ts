import { type IAuthenticationAppConfiguration, type IUserCredentials } from '@domains/authentication';
import { type AbstractUsersApp, type ICreateUser, type IUsersRepository } from '@domains/users';
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
  protected readonly usersApp: AbstractUsersApp;
  /**
   * Provides access to user data.
   */
  protected readonly usersRepository: IUsersRepository;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Authentication App configuration options.
   */
  protected constructor({
    cryptographyService,
    tokenService,
    usersApp,
    usersRepository
  }: IAuthenticationAppConfiguration) {
    this.cryptographyService = cryptographyService;
    this.tokenService = tokenService;
    this.usersApp = usersApp;
    this.usersRepository = usersRepository;
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
