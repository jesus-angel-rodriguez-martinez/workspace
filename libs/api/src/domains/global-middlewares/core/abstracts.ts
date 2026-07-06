import { type Express } from 'express';
import { type AbstractApiMapper } from '@domains/apis';
import {
  type IGlobalMiddlewaresServiceConfiguration,
  type GlobalMiddlewaresDependencies
} from '@domains/global-middlewares';
import { type AbstractLoggerService } from '@libs/logger';

/**
 * Abstract base class for the Global Middlewares Service.
 */
export abstract class AbstractGlobalMiddlewaresService {
  /**
   * Absolute path to the application's primary core document.
   */
  protected readonly apiDocPath: string;
  /**
   * Maps a domain entity to its corresponding API representation.
   */
  protected readonly apiMapper: AbstractApiMapper;
  /**
   * Express application instance.
   */
  protected readonly app: Express;
  /**
   * Dependency container injected into API routes.
   */
  protected readonly dependencies: GlobalMiddlewaresDependencies;
  /**
   * Absolute path to the directory that contains the application's endpoint files.
   */
  protected readonly endpointsPath: string;
  /**
   * Logging service used for structured output and diagnostics.
   */
  protected readonly loggerService: AbstractLoggerService;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Global Middlewares configuration options.
   */
  protected constructor({
    apiDocPath,
    apiMapper,
    app,
    dependencies,
    endpointsPath,
    loggerService
  }: IGlobalMiddlewaresServiceConfiguration) {
    this.apiDocPath = apiDocPath;
    this.apiMapper = apiMapper;
    this.app = app;
    this.dependencies = dependencies;
    this.endpointsPath = endpointsPath;
    this.loggerService = loggerService;
  }

  /**
   * Defines and registers request-specific middleware for the API calls.
   */
  public abstract setRequestMiddlewares(): void;
  /**
   * Defines and registers response-specific middleware for the API calls.
   */
  public abstract setResponseMiddlewares(): void;
  /**
   * Defines and registers all API routes and endpoint handlers.
   *
   * @returns A Promise that resolves when the routing is fully configured.
   */
  public abstract setRouting(): Promise<void>;
  /**
   * Registers request and response validation middleware based on the API specification.
   */
  public abstract setValidators(): void;
}
