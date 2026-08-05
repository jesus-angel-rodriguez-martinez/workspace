import { AuthenticationController } from '@infrastructures/authentication';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
