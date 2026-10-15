import { type AbstractAuthenticationApp } from '@domains/authentication';
import {
  type AbstractAuthenticationApiMapper,
  type AbstractAuthenticationResponseMapper
} from '@infrastructures/authentication';
import { type AbstractUserApiMapper } from '@infrastructures/user';
import { type AbstractLoggerService } from '@libs/logger';
import { type INestApplication } from '@nestjs/common';

export type ComposeApi = (options: IComposeApiOptions) => Promise<INestApplication>;

export interface IComposeApiOptions {
  /**
   * Responsible for mapping authentication API errors.
   */
  readonly authenticationApiMapper: AbstractAuthenticationApiMapper;
  /**
   * Provides authentication use cases.
   */
  readonly authenticationApp: AbstractAuthenticationApp;
  /**
   * Responsible for mapping authentication responses.
   */
  readonly authenticationResponseMapper: AbstractAuthenticationResponseMapper;
  /**
   * Logging service used for structured output and diagnostics.
   */
  readonly loggerService: AbstractLoggerService;
  /**
   * Responsible for mapping user API errors.
   */
  readonly userApiMapper: AbstractUserApiMapper;
}
