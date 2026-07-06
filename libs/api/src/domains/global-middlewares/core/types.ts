import { type Express } from 'express';
import { type AbstractApiMapper } from '@domains/apis';
import { type IResolvedPaths } from '@domains/paths';
import { type AbstractLoggerService } from '@libs/logger';

export interface IGlobalMiddlewaresServiceConfiguration extends IResolvedPaths {
  /**
   * Maps a domain entity to its corresponding API representation.
   */
  apiMapper: AbstractApiMapper;
  /**
   * Express application instance.
   */
  app: Express;
  /**
   * Dependency container injected into API routes.
   */
  dependencies: GlobalMiddlewaresDependencies;
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
}

/**
 * Dependency container injected into API routes.
 */
export type GlobalMiddlewaresDependencies = Record<string, unknown>;
