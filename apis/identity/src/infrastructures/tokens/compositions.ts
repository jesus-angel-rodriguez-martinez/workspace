import { type ComposeTokens } from '@infrastructures/tokens';
import { TokenService } from '@libs/security';

export const composeTokens: ComposeTokens = (configuration) => {
  const tokenService = new TokenService(configuration);
  return tokenService;
};
