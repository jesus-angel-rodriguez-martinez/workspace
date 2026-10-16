import { type IAuthenticationTokens } from '@domains/authentication';
import {
  AbstractAuthenticationResponseMapper,
  type IAuthenticationTokensResponse
} from '@infrastructures/authentication';

export class AuthenticationResponseMapper extends AbstractAuthenticationResponseMapper {
  public constructor() {
    super();
  }

  public toAuthenticationTokensResponse(
    authenticationTokens: IAuthenticationTokens
  ): IAuthenticationTokensResponse {
    const { accessToken, refreshToken } = authenticationTokens;

    return { accessToken, refreshToken };
  }
}
