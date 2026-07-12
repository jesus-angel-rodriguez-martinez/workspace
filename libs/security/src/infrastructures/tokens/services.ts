import jsonwebtoken from 'jsonwebtoken';
import {
  AbstractTokenService,
  type AuthenticationToken,
  type ITokenPayload,
  type ITokenServiceConfiguration,
  TOKEN_RULES,
  TokenExpiryError,
  TokenIssuanceError,
  TokenValidationError,
  WeakTokenConfigurationError
} from '@domains/tokens';

const { sign, verify, TokenExpiredError } = jsonwebtoken;

export class TokenService extends AbstractTokenService {
  constructor(configuration: ITokenServiceConfiguration) {
    super(configuration);
  }

  public generateToken(userId: string): AuthenticationToken {
    try {
      const { algorithm, expiresIn, secret } = this.configuration;

      const milliseconds = 1_000;
      const nowInSeconds = Math.floor(Date.now() / milliseconds);

      const tokenPayload: ITokenPayload = {
        exp: nowInSeconds + expiresIn,
        iat: nowInSeconds,
        sub: userId
      };

      const token = sign(tokenPayload, secret, {
        algorithm
      });
      return token;
    } catch (error) {
      throw new TokenIssuanceError({ cause: error });
    }
  }

  protected validateConfiguration(): void {
    const { secret } = this.configuration;

    if (secret.length < TOKEN_RULES.secret.MIN_LENGTH) {
      throw new WeakTokenConfigurationError('secret', TOKEN_RULES.secret.MIN_LENGTH);
    }
  }

  public verifyToken(token: AuthenticationToken): ITokenPayload {
    try {
      const { algorithm, secret } = this.configuration;

      const payload = verify(token, secret, {
        algorithms: [algorithm]
      }) as ITokenPayload;
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TokenExpiryError({ cause: error });
      }

      throw new TokenValidationError({ cause: error });
    }
  }
}
