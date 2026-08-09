import { ApiModule, type ComposeApi } from '@infrastructures/api';
import { LoggerAdapter } from '@infrastructures/loggers';
import { ApiExceptionFilter, ApiMapper } from '@libs/api';
import { NestFactory } from '@nestjs/core';

export const composeApi: ComposeApi = async ({
  authenticationApiMapper,
  authenticationApp,
  loggerService,
  usersApiMapper
}) => {
  const logger = new LoggerAdapter(loggerService);

  const apiMapper = new ApiMapper({ mappers: [usersApiMapper, authenticationApiMapper] });
  const apiExceptionFilter = new ApiExceptionFilter(apiMapper, loggerService);

  const entryModule = ApiModule.forRoot(authenticationApp);
  const api = await NestFactory.create(entryModule, {
    bufferLogs: true,
    logger
  });

  api.useGlobalFilters(apiExceptionFilter);

  return api;
};
