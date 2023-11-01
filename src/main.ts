import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(ConfigService);

  app.enableCors();

  app.setGlobalPrefix('api/integration/multios/websocket/v1');

  await app.listen(configService.get<number>('port'));
  Logger.log(`server on ${configService.get<number>('port')}`);
}
bootstrap();
