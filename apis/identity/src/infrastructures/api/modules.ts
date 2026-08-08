import { type AbstractAuthenticationApp } from '@domains/authentication';
import { AuthenticationApiModule } from '@infrastructures/authentication';
import { type DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ApiModule {
  static forRoot(authenticationApp: AbstractAuthenticationApp): DynamicModule {
    const authenticationApiModule = AuthenticationApiModule.forRoot(authenticationApp);
    return {
      imports: [authenticationApiModule],
      module: ApiModule
    };
  }
}
