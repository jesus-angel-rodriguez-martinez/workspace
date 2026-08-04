import { JWT_SECRET } from '@infrastructures/configurations';
import { TokenService } from '@libs/security';

export const tokenService = new TokenService({
  algorithm: 'HS256',
  expiresIn: 3_600,
  secret: JWT_SECRET
});
