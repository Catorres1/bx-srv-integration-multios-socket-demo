import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule, LoggerService } from '#commons';
import { SharedModule, WebHookModule } from '#modules';
import configuration from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    forwardRef(() => SharedModule),
    HealthModule,
    WebHookModule,
  ],
  providers: [LoggerService],
})
export class AppModule {}
