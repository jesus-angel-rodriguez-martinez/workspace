import { AuthenticationApp } from '@domains/authentication';
import {
  AuthenticationApiMapper,
  AuthenticationResponseMapper,
  type ComposeAuthentication
} from '@infrastructures/authentication';

export const composeAuthentication: ComposeAuthentication = ({
  cryptographyService,
  tokenService,
  usersApp,
  usersRepository
}) => {
  const authenticationApiMapper = new AuthenticationApiMapper();

  const authenticationApp = new AuthenticationApp({
    cryptographyService,
    tokenService,
    usersApp,
    usersRepository
  });

  const authenticationResponseMapper = new AuthenticationResponseMapper();

  return { authenticationApiMapper, authenticationApp, authenticationResponseMapper };
};
