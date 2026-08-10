import { AbstractAuthenticationApp } from '@domains/authentication';
import {
  AbstractAuthenticationResponseMapper,
  AuthenticationApiController
} from '@infrastructures/authentication';
import { type DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AuthenticationApiModule {
  static forRoot(
    authenticationApp: AbstractAuthenticationApp,
    authenticationResponseMapper: AbstractAuthenticationResponseMapper
  ): DynamicModule {
    return {
      controllers: [AuthenticationApiController],
      module: AuthenticationApiModule,
      providers: [
        { provide: AbstractAuthenticationApp, useValue: authenticationApp },
        { provide: AbstractAuthenticationResponseMapper, useValue: authenticationResponseMapper }
      ]
    };
  }
}
