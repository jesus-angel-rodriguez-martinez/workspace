import { AuthenticationApp } from '@domains/authentication';
import { AuthenticationApiMapper, type ComposeAuthentication } from '@infrastructures/authentication';

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

  return { authenticationApiMapper, authenticationApp };
};
