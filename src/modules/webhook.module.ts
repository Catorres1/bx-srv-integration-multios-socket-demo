import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerService } from '#commons';
import { WebhookController } from '#controllers';
import { WebsocketGateway } from '#events';

@Module({
  imports: [ConfigModule],
  controllers: [WebhookController],
  providers: [LoggerService, WebsocketGateway],
})
export class WebHookModule {}
