import { ApiErrorFilter, ApiMapper, ApiModule, type ComposeApi } from '@infrastructures/api';
import { LoggerAdapter } from '@infrastructures/loggers';
import { NestFactory } from '@nestjs/core';

export const composeApi: ComposeApi = async ({
  authenticationApiMapper,
  authenticationApp,
  loggerService,
  usersApiMapper
}) => {
  const entryModule = ApiModule.forRoot(authenticationApp);

  const logger = new LoggerAdapter(loggerService);

  const apiMapper = new ApiMapper({
    authenticationApiMapper,
    usersApiMapper
  });

  const apiErrorFilter = new ApiErrorFilter(apiMapper, loggerService);

  const api = await NestFactory.create(entryModule, {
    bufferLogs: true,
    logger
  });
  api.useGlobalFilters(apiErrorFilter);

  return api;
};
