import { ApiModule, type ComposeApi } from '@infrastructures/api';
import { ApiExceptionFilter, ApiInterceptor, ApiMapper, LoggerAdapter } from '@libs/api';
import { NestFactory } from '@nestjs/core';

export const composeApi: ComposeApi = async ({
  authenticationApiMapper,
  authenticationApp,
  authenticationResponseMapper,
  loggerService,
  usersApiMapper
}) => {
  const logger = new LoggerAdapter(loggerService);

  const apiMapper = new ApiMapper({ mappers: [usersApiMapper, authenticationApiMapper] });
  const apiExceptionFilter = new ApiExceptionFilter({ apiMapper, loggerService });
  const apiInterceptor = new ApiInterceptor();

  const entryModule = ApiModule.forRoot(authenticationApp, authenticationResponseMapper);
  const api = await NestFactory.create(entryModule, {
    bufferLogs: true,
    logger
  });

  api.useGlobalFilters(apiExceptionFilter);
  api.useGlobalInterceptors(apiInterceptor);

  return api;
};
