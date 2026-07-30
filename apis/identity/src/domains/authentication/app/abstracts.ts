import { type IAuthenticationAppConfiguration, type IUserCredentials } from '@domains/authentication';
import { type IUsersRepository } from '@domains/users';
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
   * Provides cryptographic utilities for securely verifying passwords.
   */
  protected readonly cryptographyService: AbstractCryptographyService;
  /**
   * Provides utilities for generating and validating authentication tokens.
   */
  protected readonly tokenService: AbstractTokenService;
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
    usersRepository
  }: IAuthenticationAppConfiguration) {
    this.cryptographyService = cryptographyService;
    this.tokenService = tokenService;
    this.usersRepository = usersRepository;
  }

  /**
   * Authenticates a user using their credentials.
   *
   * @param userCredentials - The credentials provided by the user.
   *
   * @returns A promise that resolves with the authentication token.
   */
  public abstract authenticate(userCredentials: IUserCredentials): Promise<AuthenticationToken>;
  /**
   * Issues an authentication token for the given user.
   *
   * @param userId - The unique identifier of the user for whom the token will be issued.
   *
   * @returns The generated authentication token.
   */
  public abstract issueToken(userId: string): AuthenticationToken;
}
