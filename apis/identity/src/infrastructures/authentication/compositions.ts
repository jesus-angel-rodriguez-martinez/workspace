import { AuthenticationApp } from '@domains/authentication';
import {
  AuthenticationApiMapper,
  AuthenticationResponseMapper,
  type ComposeAuthentication
} from '@infrastructures/authentication';

export const composeAuthentication: ComposeAuthentication = ({
  cryptographyService,
  tokenService,
  userApp,
  userRepository
}) => {
  const authenticationApiMapper = new AuthenticationApiMapper();

  const authenticationApp = new AuthenticationApp({
    cryptographyService,
    tokenService,
    userApp,
    userRepository
  });

  const authenticationResponseMapper = new AuthenticationResponseMapper();

  return { authenticationApiMapper, authenticationApp, authenticationResponseMapper };
};
