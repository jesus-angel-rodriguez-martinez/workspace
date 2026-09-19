import jsonwebtoken from 'jsonwebtoken';
import {
  AbstractTokenService,
  AggregateTokenConfigurationError,
  type AuthenticationToken,
  type ITokenPayload,
  type ITokenServiceConfiguration,
  TOKEN_RULES,
  TokenExpiryError,
  TokenIssuanceError,
  TokenValidationError,
  WeakTokenSecretError
} from '@domains/token';
import { type IKernelError } from '@libs/kernel';

const { TokenExpiredError, sign, verify } = jsonwebtoken;

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

  protected validateConfiguration(configuration: ITokenServiceConfiguration): void {
    const { secret } = configuration;

    const errors: IKernelError[] = [];

    if (secret.length < TOKEN_RULES.secret.MIN_LENGTH) {
      errors.push(new WeakTokenSecretError());
    }

    if (errors.length) {
      throw new AggregateTokenConfigurationError(errors);
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
