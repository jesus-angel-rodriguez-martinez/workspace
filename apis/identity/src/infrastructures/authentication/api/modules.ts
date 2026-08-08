import { AbstractAuthenticationApp } from '@domains/authentication';
import { AuthenticationApiController } from '@infrastructures/authentication';
import { type DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AuthenticationApiModule {
  static forRoot(authenticationApp: AbstractAuthenticationApp): DynamicModule {
    return {
      controllers: [AuthenticationApiController],
      module: AuthenticationApiModule,
      providers: [{ provide: AbstractAuthenticationApp, useValue: authenticationApp }]
    };
  }
}
