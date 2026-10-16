import {
  AbstractAuthenticationApp,
  type IRefreshCredentials,
  type IUserCredentials
} from '@domains/authentication';
import { type ICreateUser } from '@domains/user';
import {
  AbstractAuthenticationResponseMapper,
  type IAuthenticationTokensResponse
} from '@infrastructures/authentication';
import { Body, Controller, forwardRef, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';

@Controller('/authentication')
export class AuthenticationApiController {
  constructor(
    @Inject(AbstractAuthenticationApp)
    private readonly authenticationApp: AbstractAuthenticationApp,
    @Inject(forwardRef(() => AbstractAuthenticationResponseMapper))
    private readonly authenticationResponseMapper: AbstractAuthenticationResponseMapper
  ) {}

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshCredentials: IRefreshCredentials): Promise<IAuthenticationTokensResponse> {
    const authenticationTokens = await this.authenticationApp.refresh(refreshCredentials);
    return this.authenticationResponseMapper.toAuthenticationTokensResponse(authenticationTokens);
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userCredentials: IUserCredentials): Promise<IAuthenticationTokensResponse> {
    const authenticationTokens = await this.authenticationApp.logIn(userCredentials);
    return this.authenticationResponseMapper.toAuthenticationTokensResponse(authenticationTokens);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() payload: ICreateUser): Promise<IAuthenticationTokensResponse> {
    const authenticationTokens = await this.authenticationApp.signUp(payload);
    return this.authenticationResponseMapper.toAuthenticationTokensResponse(authenticationTokens);
  }
}
