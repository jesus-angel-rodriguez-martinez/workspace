import { type AbstractAuthenticationApp } from '@domains/authentication';
import {
  type AbstractAuthenticationApiMapper,
  type AbstractAuthenticationResponseMapper
} from '@infrastructures/authentication';
import { type AbstractUsersApiMapper } from '@infrastructures/users';
import { type AbstractLoggerService } from '@libs/logger';
import { type INestApplication } from '@nestjs/common';

export type ComposeApi = (configuration: IComposeApiConfiguration) => Promise<INestApplication>;

export interface IComposeApiConfiguration {
  /**
   * Responsible for mapping authentication API errors.
   */
  authenticationApiMapper: AbstractAuthenticationApiMapper;
  /**
   * Provides authentication use cases.
   */
  authenticationApp: AbstractAuthenticationApp;
  /**
   * Responsible for mapping authentication responses.
   */
  authenticationResponseMapper: AbstractAuthenticationResponseMapper;
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
  /**
   * Responsible for mapping user API errors.
   */
  usersApiMapper: AbstractUsersApiMapper;
}
