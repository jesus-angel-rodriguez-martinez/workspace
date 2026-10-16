import {
  type DecodedToken,
  type EncodedToken,
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
   * Issues and signs a new token of the configured type for the specified user.
   *
   * @param userId - The unique identifier of the authenticated user for whom the token will be issued.
   *
   * @returns The signed encoded token.
   */
  public abstract issueToken(userId: string): EncodedToken;
  /**
   * Verifies and decodes an encoded token.
   *
   * @param token - The encoded token to verify.
   *
   * @returns The decoded token when the encoded token is valid.
   */
  public abstract verifyToken(token: EncodedToken): DecodedToken;
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
