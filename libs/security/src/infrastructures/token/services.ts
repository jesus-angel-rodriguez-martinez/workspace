import jsonwebtoken from 'jsonwebtoken';
import {
  AbstractTokenService,
  type DecodedToken,
  type EncodedToken,
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

  public issueToken(userId: string): EncodedToken {
    try {
      const { algorithm, expiresIn, secret, type } = this.configuration;

      const milliseconds = 1_000;
      const nowInSeconds = Math.floor(Date.now() / milliseconds);

      const decodedToken: DecodedToken = {
        exp: nowInSeconds + expiresIn,
        iat: nowInSeconds,
        sub: userId,
        type
      };

      const encodedToken = sign(decodedToken, secret, {
        algorithm
      });
      return encodedToken;
    } catch (error) {
      throw new TokenIssuanceError({ cause: error });
    }
  }

  public verifyToken(token: EncodedToken): DecodedToken {
    const { algorithm, secret, type } = this.configuration;

    try {
      const decodedToken = verify(token, secret, {
        algorithms: [algorithm]
      }) as DecodedToken;

      if (decodedToken.type !== type) {
        throw new TokenValidationError(type);
      }
      return decodedToken;
    } catch (error) {
      if (error instanceof TokenValidationError) {
        throw error;
      }
      if (error instanceof TokenExpiredError) {
        throw new TokenExpiryError(type, { cause: error });
      }
      throw new TokenValidationError(type, { cause: error });
    }
  }
}
