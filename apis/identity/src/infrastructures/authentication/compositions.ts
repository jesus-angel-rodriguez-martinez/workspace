import { AuthenticationApp } from '@domains/authentication';
import {
  AuthenticationApiMapper,
  AuthenticationResponseMapper,
  type ComposeAuthentication
} from '@infrastructures/authentication';

export const composeAuthentication: ComposeAuthentication = ({
  accessTokenService,
  cryptographyService,
  refreshTokenService,
  userApp,
  userRepository
}) => {
  const authenticationApiMapper = new AuthenticationApiMapper();

  const authenticationApp = new AuthenticationApp({
    accessTokenService,
    cryptographyService,
    refreshTokenService,
    userApp,
    userRepository
  });

  const authenticationResponseMapper = new AuthenticationResponseMapper();

  return { authenticationApiMapper, authenticationApp, authenticationResponseMapper };
};
