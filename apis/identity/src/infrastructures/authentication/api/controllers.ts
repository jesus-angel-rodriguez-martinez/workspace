import { AbstractAuthenticationApp, type IUserCredentials } from '@domains/authentication';
import { type ICreateUser } from '@domains/users';
import { type AuthenticationToken } from '@libs/security';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';

@Controller('/authentication')
export class AuthenticationApiController {
  constructor(
    @Inject(AbstractAuthenticationApp)
    private readonly authenticationApp: AbstractAuthenticationApp
  ) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userCredentials: IUserCredentials): Promise<AuthenticationToken> {
    const authenticationToken = await this.authenticationApp.logIn(userCredentials);
    return authenticationToken;
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() payload: ICreateUser): Promise<AuthenticationToken> {
    const authenticationToken = await this.authenticationApp.signUp(payload);
    return authenticationToken;
  }
}
