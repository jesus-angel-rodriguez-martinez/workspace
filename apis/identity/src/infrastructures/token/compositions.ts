import { type ComposeToken } from '@infrastructures/token';
import { TokenService } from '@libs/security';

export const composeToken: ComposeToken = (options) => {
  const tokenService = new TokenService(options);
  return tokenService;
};
