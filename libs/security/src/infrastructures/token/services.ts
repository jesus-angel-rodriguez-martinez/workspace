import jsonwebtoken from 'jsonwebtoken';
import {
  AbstractTokenService,
  type AuthenticationToken,
  type ITokenPayload,
  type ITokenServiceOptions,
  TokenExpiryError,
  TokenIssuanceError,
  TokenValidationError
} from '@domains/token';

const { TokenExpiredError, sign, verify } = jsonwebtoken;

export class TokenService extends AbstractTokenService {
  constructor(options: ITokenServiceOptions) {
    super(options);
  }

  public generateToken(userId: string): AuthenticationToken {
    try {
      const { algorithm, expiresIn, secret, type } = this.configuration;

      const milliseconds = 1_000;
      const nowInSeconds = Math.floor(Date.now() / milliseconds);

      const tokenPayload: ITokenPayload = {
        exp: nowInSeconds + expiresIn,
        iat: nowInSeconds,
        sub: userId,
        type
      };

      const token = sign(tokenPayload, secret, {
        algorithm
      });
      return token;
    } catch (error) {
      throw new TokenIssuanceError({ cause: error });
    }
  }

  public verifyToken(token: AuthenticationToken): ITokenPayload {
    const payload = this.verifySignature(token);

    if (payload.type !== this.configuration.type) {
      throw new TokenValidationError();
    }

    return payload;
  }

  protected verifySignature(token: AuthenticationToken): ITokenPayload {
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
