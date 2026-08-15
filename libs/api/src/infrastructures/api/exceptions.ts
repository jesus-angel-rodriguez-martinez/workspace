import {
  type AbstractApiMapper,
  ApiError,
  type IApiErrorsResponse,
  type IApiSafeErrorResponse,
  InternalServerError,
  type UnknownError
} from '@domains/api';
import { STATUS_CODE } from '@domains/status-code';
import { type IApiExceptionFilterConfiguration } from '@infrastructures/api';
import { KernelError } from '@libs/kernel';
import { type AbstractLoggerService } from '@libs/logger';
import { type ArgumentsHost, Catch, type ExceptionFilter } from '@nestjs/common';
import { type Response } from 'express';

@Catch(ApiError, KernelError)
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly apiMapper: AbstractApiMapper;
  private readonly loggerService: AbstractLoggerService;

  constructor({ apiMapper, loggerService }: IApiExceptionFilterConfiguration) {
    this.apiMapper = apiMapper;
    this.loggerService = loggerService;
  }

  catch(unknownError: UnknownError, host: ArgumentsHost): void {
    const error =
      unknownError instanceof ApiError
        ? unknownError
        : (this.apiMapper.toApiError(unknownError) ?? new InternalServerError({ cause: unknownError }));

    const statusCode = parseInt(error.status, 10);
    if (statusCode >= STATUS_CODE.INTERNAL_SERVER_ERROR) {
      this.loggerService.error('Server-side failure.', { error });
    } else {
      this.loggerService.debug('Client-side failure.', { error });
    }

    const apiSafeErrorResponse: IApiSafeErrorResponse = {
      code: error.code,
      detail: error.detail,
      status: error.status,
      title: error.title
    };
    const apiErrorsResponse: IApiErrorsResponse = { errors: [apiSafeErrorResponse] };

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    response.status(statusCode).json(apiErrorsResponse);
  }
}
