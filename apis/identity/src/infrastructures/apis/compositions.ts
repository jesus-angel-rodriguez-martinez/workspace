import { ApiModule, ComposeApis } from '@infrastructures/apis';
import { NestFactory } from '@nestjs/core';

export const composeApis: ComposeApis = async (_configuration) => {
  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
};
