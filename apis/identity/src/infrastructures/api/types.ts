import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type INestApplication } from '@nestjs/common';

export type ComposeApi = (configuration: IComposeApiConfiguration) => Promise<INestApplication>;

export interface IComposeApiConfiguration {
  /**
   * Provides authentication use cases.
   */
  authenticationApp: AbstractAuthenticationApp;
}
