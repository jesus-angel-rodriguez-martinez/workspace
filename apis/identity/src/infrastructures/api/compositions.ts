import { ApiModule, type ComposeApi } from '@infrastructures/api';
import { NestFactory } from '@nestjs/core';

export const composeApi: ComposeApi = async ({ authenticationApp }) => {
  const entryModule = ApiModule.forRoot(authenticationApp);
  const api = await NestFactory.create(entryModule);
  return api;
};
