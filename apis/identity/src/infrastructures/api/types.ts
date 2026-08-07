import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type AbstractLoggerService } from '@libs/logger';
import { type INestApplication } from '@nestjs/common';

export type ComposeApi = (configuration: IComposeApiConfiguration) => Promise<INestApplication>;

export interface IComposeApiConfiguration {
  /**
   * Provides authentication use cases.
   */
  authenticationApp: AbstractAuthenticationApp;
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
}
