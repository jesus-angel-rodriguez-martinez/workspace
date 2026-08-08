import { type AuthenticationError, WrongCredentialsError } from '@domains/authentication';
import {
  AbstractAuthenticationApiMapper,
  type AuthenticationApiError,
  WrongCredentialsApiError
} from '@infrastructures/authentication';

export class AuthenticationApiMapper extends AbstractAuthenticationApiMapper {
  public constructor() {
    super();
  }

  public toApiError(error: AuthenticationError): AuthenticationApiError | undefined {
    if (error instanceof WrongCredentialsError) {
      return new WrongCredentialsApiError(error);
    }

    const exhaustiveCheck: never = error;
    void exhaustiveCheck;

    return undefined;
  }
}
