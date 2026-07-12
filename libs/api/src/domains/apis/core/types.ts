import { type Express } from 'express';
import { type ApiError } from '@domains/apis';
import { type AbstractAuthenticationMiddlewaresService } from '@domains/authentication-middlewares';
import { type AbstractGlobalMiddlewaresService } from '@domains/global-middlewares';
import { type StatusCode } from '@domains/status-codes';
import { type CoreError } from '@libs/core';
import { type AbstractLoggerService } from '@libs/logger';

/**
 * Defines the standardized structure of an API error object used across the application.
 */
export interface IApiError {
  /**
   * The underlying error or value that caused this error, if any.
   */
  cause?: unknown;
  /**
   * A machine-readable identifier for the specific type of error.
   */
  code: string;
  /**
   * A human-readable explanation of the error, specific to this occurrence.
   */
  detail: string;
  /**
   * The HTTP status code applicable to this error, expressed as a string.
   */
  status: StatusCode<string>;
  /**
   * A short, human-readable summary of the error type.
   */
  title: string;
}

/**
 * Partial representation of an API error used to override properties of base errors.
 *
 * The `status` field is omitted to keep the HTTP code fixed.
 */
export interface IApiErrorOptions extends Partial<Omit<IApiError, keyof Pick<IApiError, 'status'>>> {}

/*
 * Defines the standardized structure of an API error response containing multiple error objects.
 * The `cause` field is omitted for security reasons.
 */
export interface IApiErrors {
  /*
   * Array of individual error details.
   */
  errors: Partial<Omit<IApiError, keyof Pick<IApiError, 'cause'>>>[];
}

/**
 * Configuration contract for initializing the API service.
 */
export interface IApiServiceConfiguration {
  /**
   * Express application instance.
   */
  app: Express;
  /**
   * This service is responsible for orchestrating the setup of all authentication API middlewares.
   */
  authenticationMiddlewaresService: AbstractAuthenticationMiddlewaresService;
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
  /**
   * This service is responsible for orchestrating the setup of all global API middlewares.
   */
  globalMiddlewaresService: AbstractGlobalMiddlewaresService;
  /**
   * Port number for the API server to listen on.
   */
  port: number;
}

/**
 * Represents any error type that can be intercepted and processed by the API.
 */
export type UnknownError = ApiError | ApiError[] | CoreError | Error;
