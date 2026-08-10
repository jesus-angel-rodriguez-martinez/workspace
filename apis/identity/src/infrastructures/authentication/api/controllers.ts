import { AbstractAuthenticationApp, type IUserCredentials } from '@domains/authentication';
import { type ICreateUser } from '@domains/users';
import {
  AbstractAuthenticationResponseMapper,
  type IAuthenticationTokenResponse
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

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userCredentials: IUserCredentials): Promise<IAuthenticationTokenResponse> {
    const authenticationToken = await this.authenticationApp.logIn(userCredentials);
    return this.authenticationResponseMapper.toAuthenticationTokenResponse(authenticationToken);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() payload: ICreateUser): Promise<IAuthenticationTokenResponse> {
    const authenticationToken = await this.authenticationApp.signUp(payload);
    return this.authenticationResponseMapper.toAuthenticationTokenResponse(authenticationToken);
  }
}
