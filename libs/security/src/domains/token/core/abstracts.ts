import {
  type AuthenticationToken,
  type ITokenPayload,
  type ITokenServiceConfiguration
} from '@domains/token';

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
    this.validateConfiguration(configuration);

    this.configuration = configuration;
  }

  /**
   * Generates and signs a new authentication token for the specified user.
   *
   * @param userId - The unique identifier of the authenticated user for whom the token will be issued.
   *
   * @returns The generated authentication token string.
   */
  public abstract generateToken(userId: string): AuthenticationToken;
  /**
   * Validates that the configuration meets the minimum security requirements.
   *
   * @param configuration - Token configuration options to validate.
   */
  protected abstract validateConfiguration(configuration: ITokenServiceConfiguration): void;
  /**
   * Verifies the signature and expiration of an authentication token.
   *
   * @param token - The authentication token to verify.
   *
   * @returns The decoded token payload when the token is valid.
   */
  public abstract verifyToken(token: AuthenticationToken): ITokenPayload;
}
