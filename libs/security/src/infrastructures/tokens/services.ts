import jsonwebtoken from 'jsonwebtoken';
import {
  AbstractTokenService,
  type AuthenticationToken,
  type ITokenPayload,
  type ITokenServiceConfiguration
} from '@domains/tokens';
import { type ISecureUser } from '@domains/users';

export class TokenService extends AbstractTokenService {
  constructor(configuration: ITokenServiceConfiguration) {
    super(configuration);
  }

  generateToken(secureUser: ISecureUser): AuthenticationToken {
    const { algorithm, expiresIn, secret } = this.configuration;

    const milliseconds = 1_000;
    const nowInSeconds = Math.floor(Date.now() / milliseconds);

    const tokenPayload: ITokenPayload = {
      exp: nowInSeconds + expiresIn,
      iat: nowInSeconds,
      sub: secureUser.id,
      user: secureUser
    };

    const token = jsonwebtoken.sign(tokenPayload, secret, {
      algorithm
    });
    return token;
  }
}
