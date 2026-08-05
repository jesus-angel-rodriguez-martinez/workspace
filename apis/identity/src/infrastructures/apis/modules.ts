import { AuthenticationModule } from '@infrastructures/authentication';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthenticationModule]
})
export class ApiModule {}
