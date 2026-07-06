import { type Express } from 'express';
import { type Server } from 'node:http';
import { type IApiServiceConfiguration } from '@domains/apis';
import { type AbstractAuthenticationMiddlewaresService } from '@domains/authentication-middlewares';
import { type AbstractGlobalMiddlewaresService } from '@domains/global-middlewares';
import { type ICoreService } from '@libs/core';
import { type AbstractLoggerService } from '@libs/logger';

export abstract class AbstractApiService implements ICoreService {
  /**
   * Express application instance.
   */
  protected readonly app: Express;
  /**
   * This service is responsible for orchestrating the setup of all authentication API middlewares.
   */
  protected readonly authenticationMiddlewaresService: AbstractAuthenticationMiddlewaresService;
  /**
   * Logging service used for structured output and diagnostics.
   */
  protected readonly loggerService: AbstractLoggerService;
  /**
   * This service is responsible for orchestrating the setup of all global API middlewares.
   */
  protected readonly globalMiddlewaresService: AbstractGlobalMiddlewaresService;
  /**
   * Port number for the API server to listen on.
   */
  protected readonly port: number;
  /**
   * API server instance.
   */
  protected server: Server | undefined;

  /**
   * Creates an instance of the API service.
   *
   * @param configuration - API configuration options.
   */
  protected constructor({
    app,
    authenticationMiddlewaresService,
    loggerService,
    globalMiddlewaresService,
    port
  }: IApiServiceConfiguration) {
    this.app = app;
    this.authenticationMiddlewaresService = authenticationMiddlewaresService;
    this.loggerService = loggerService;
    this.globalMiddlewaresService = globalMiddlewaresService;
    this.port = port;
  }

  /**
   * Gracefully shuts down the service, releasing any held resources.
   *
   * @returns A promise that resolves when cleanup is finished.
   */
  public abstract close(): Promise<void>;
  /**
   * Initializes the service with the provided configuration.
   *
   * @returns A promise that resolves when the initialization is complete.
   */
  public abstract init(): Promise<void>;
}
