import { TokenService } from '@libs/security';

export const composeToken = (secret: string) => {
  const tokenService = new TokenService({ algorithm: 'HS256', expiresIn: 3_600, secret });
  return { tokenService };
};
