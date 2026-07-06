import { type AuthenticationToken, type ITokenServiceConfiguration } from '@domains/tokens';
import { type ISecureUser } from '@domains/users';

export abstract class AbstractTokenService {
  /**
   * Token configuration options.
   */
  protected readonly configuration: ITokenServiceConfiguration;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Token configuration options.
   */
  protected constructor(configuration: ITokenServiceConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Generates and signs a new authentication token for the specified user.
   *
   * @param secureUser - The authenticated user from whom the token payload will be derived.
   *
   * @returns The generated authentication token string.
   */
  public abstract generateToken(secureUser: ISecureUser): AuthenticationToken;
}
