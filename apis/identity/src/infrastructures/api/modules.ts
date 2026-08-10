import { type AbstractAuthenticationApp } from '@domains/authentication';
import {
  type AbstractAuthenticationResponseMapper,
  AuthenticationApiModule
} from '@infrastructures/authentication';
import { type DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ApiModule {
  static forRoot(
    authenticationApp: AbstractAuthenticationApp,
    authenticationResponseMapper: AbstractAuthenticationResponseMapper
  ): DynamicModule {
    const authenticationApiModule = AuthenticationApiModule.forRoot(
      authenticationApp,
      authenticationResponseMapper
    );
    return {
      imports: [authenticationApiModule],
      module: ApiModule
    };
  }
}
