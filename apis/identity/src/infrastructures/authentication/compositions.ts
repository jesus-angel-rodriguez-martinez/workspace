import { AuthenticationApp } from '@domains/authentication';
import { type ComposeAuthentication } from '@infrastructures/authentication';

export const composeAuthentication: ComposeAuthentication = ({
  cryptographyService,
  tokenService,
  usersApp,
  usersRepository
}) => {
  const authenticationApp = new AuthenticationApp({
    cryptographyService,
    tokenService,
    usersApp,
    usersRepository
  });
  return authenticationApp;
};
