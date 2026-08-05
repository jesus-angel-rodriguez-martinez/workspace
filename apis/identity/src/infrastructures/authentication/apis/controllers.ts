import { Controller, Post } from '@nestjs/common';

@Controller('/authentication')
export class AuthenticationController {
  @Post('/sign-in')
  async signIn(): Promise<string> {
    return 'User signed in successfully.';
  }

  @Post('/sign-up')
  async signUp(): Promise<string> {
    return 'User signed up successfully.';
  }
}
