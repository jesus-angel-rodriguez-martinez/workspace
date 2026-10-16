import {
  type AuthenticationToken,
  type ITokenPayload,
  type ITokenServiceConfiguration,
  type ITokenServiceOptions
} from '@domains/token';

export abstract class AbstractTokenService {
  /**
   * Token configuration options.
   */
  protected readonly configuration: ITokenServiceConfiguration;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Token service options.
   */
  protected constructor({ configuration, tokenValidator }: ITokenServiceOptions) {
    tokenValidator.validate(configuration);

    this.configuration = Object.freeze({ ...configuration });
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
   * Verifies the signature, expiration and type of an authentication token.
   *
   * @param token - The authentication token to verify.
   *
   * @returns The decoded token payload when the token is valid.
   */
  public abstract verifyToken(token: AuthenticationToken): ITokenPayload;
}

export abstract class AbstractTokenValidator {
  /**
   * Restricts instantiation to subclasses.
   */
  protected constructor() {}

  /**
   * Validates that the configuration meets the minimum security requirements.
   *
   * @param configuration - Token configuration options to validate.
   */
  public abstract validate(configuration: ITokenServiceConfiguration): void;
}
