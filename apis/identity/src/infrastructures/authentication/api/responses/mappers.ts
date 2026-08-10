import {
  AbstractAuthenticationResponseMapper,
  type IAuthenticationTokenResponse
} from '@infrastructures/authentication';
import { type AuthenticationToken } from '@libs/security';

export class AuthenticationResponseMapper extends AbstractAuthenticationResponseMapper {
  public constructor() {
    super();
  }

  public toAuthenticationTokenResponse(token: AuthenticationToken): IAuthenticationTokenResponse {
    return { token };
  }
}
