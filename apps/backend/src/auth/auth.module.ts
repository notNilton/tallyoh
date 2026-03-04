import { Module } from '@nestjs/common';
import { WorkOsAuthGuard } from './auth.guard';

@Module({
  providers: [WorkOsAuthGuard],
  exports: [WorkOsAuthGuard],
})
export class AuthModule {}
