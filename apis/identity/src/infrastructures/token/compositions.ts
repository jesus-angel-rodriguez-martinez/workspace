import { type ComposeToken } from '@infrastructures/token';
import { TokenService } from '@libs/security';

export const composeToken: ComposeToken = (configuration) => {
  const tokenService = new TokenService(configuration);
  return tokenService;
};
