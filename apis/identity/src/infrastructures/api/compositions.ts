import { ApiModule, type ComposeApi } from '@infrastructures/api';
import { LoggerAdapter } from '@infrastructures/loggers';
import { NestFactory } from '@nestjs/core';

export const composeApi: ComposeApi = async ({ authenticationApp, loggerService }) => {
  const entryModule = ApiModule.forRoot(authenticationApp);

  const logger = new LoggerAdapter(loggerService);

  const api = await NestFactory.create(entryModule, {
    bufferLogs: true,
    logger
  });
  return api;
};
