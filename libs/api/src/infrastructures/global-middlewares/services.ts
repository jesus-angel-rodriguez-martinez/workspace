import cors from 'cors';
import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import expressOpenApi from 'express-openapi';
import openApiValidator from 'express-openapi-validator';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import passport from 'passport';
import {
  ApiError,
  BadRequestError,
  ForbiddenError,
  type IApiError,
  type IApiErrors,
  type IApiErrorOptions,
  InternalServerError,
  UnauthorizedError,
  type UnknownError,
  UnsupportedMediaTypeError
} from '@domains/apis';
import {
  AbstractGlobalMiddlewaresService,
  type IGlobalMiddlewaresServiceConfiguration
} from '@domains/global-middlewares';
import { STATUS_CODES } from '@domains/status-codes';
import { type IOpenApiErrors, jwtSecurityHandler } from '@infrastructures/apis';
import { CoreError } from '@libs/core';

export class GlobalMiddlewaresService extends AbstractGlobalMiddlewaresService {
  constructor(configuration: IGlobalMiddlewaresServiceConfiguration) {
    super(configuration);
  }

  protected finalErrorResponderMiddleware(): ErrorRequestHandler {
    return (
      unknownError: UnknownError,
      _request: Request,
      response: Response<IApiErrors>,
      _next: NextFunction
    ) => {
      const fallback = new InternalServerError();
      let errors: ApiError[] = [fallback];

      if (Array.isArray(unknownError)) {
        errors = unknownError;
      } else if (unknownError instanceof CoreError) {
        errors = [this.apiMapper.toApiError(unknownError) || fallback];
      } else if (unknownError instanceof ApiError) {
        errors = [unknownError];
      }

      const [firstError = fallback] = errors;
      const statusCode = parseInt(firstError.status, 10);
      if (statusCode >= STATUS_CODES.INTERNAL_SERVER_ERROR) {
        this.loggerService.error(`Server-side failure.`, { error: firstError });
      } else {
        this.loggerService.warn(`Client-side failure.`, { error: firstError });
      }

      const safeErrors: IApiError[] = errors.map((error) => ({
        code: error.code,
        detail: error.detail,
        status: error.status,
        title: error.title
      }));

      return response.status(statusCode).json({ errors: safeErrors });
    };
  }

  protected openApiErrorConverterMiddleware(): ErrorRequestHandler {
    return (
      unknownError: ApiError | Error | IOpenApiErrors,
      _request: Request,
      _response: Response,
      next: NextFunction
    ) => {
      if (unknownError instanceof HttpError) {
        const formattedErrors = unknownError.errors.map((error) => {
          const parts = [error.errorCode, error.message, error.path].filter(Boolean);
          const options: IApiErrorOptions = {
            detail: parts.join(' ')
          };
          switch (unknownError.status) {
            case STATUS_CODES.BAD_REQUEST:
              return new BadRequestError(options);
            case STATUS_CODES.UNAUTHORIZED:
              return new UnauthorizedError(options);
            case STATUS_CODES.FORBIDDEN:
              return new ForbiddenError(options);
            case STATUS_CODES.UNSUPPORTED_MEDIA_TYPE:
              return new UnsupportedMediaTypeError(options);
            default:
              return new InternalServerError();
          }
        });

        return next(formattedErrors);
      }

      return next(unknownError);
    };
  }

  public setRequestMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json({ type: 'application/vnd.api+json' }));
    this.app.use(passport.initialize());
  }

  public setResponseMiddlewares(): void {
    this.app.use(this.openApiErrorConverterMiddleware());
    this.app.use(this.finalErrorResponderMiddleware());
  }

  public async setRouting(): Promise<void> {
    const { apiDocPath: apiDoc, app, dependencies, endpointsPath: paths, loggerService: logger } = this;

    await expressOpenApi.initialize({
      apiDoc,
      app,
      dependencies,
      logger,
      paths,
      promiseMode: true,
      routesGlob: '**/*.{ts,js}',
      routesIndexFileRegExp: /\.(ts|js)$/,
      securityHandlers: {
        jwtSecurityHandler
      },
      validateApiDoc: true
    });
  }

  public setValidators(): void {
    const { apiDocPath: apiSpec, app } = this;

    app.use(
      openApiValidator.middleware({
        apiSpec,
        validateRequests: true,
        validateResponses: true
      })
    );
  }
}
