import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoggerService } from '#commons';
import { ResponseInterceptor, ExceptionInterceptor } from '#interceptors';
import {
  IEmissionWebhook,
  ISocketEmissionStatusEvent,
} from '#commons/interfaces';
import { WebsocketGateway } from '#events';

@Controller('webhook')
@UseInterceptors(ExceptionInterceptor, ResponseInterceptor)
export class WebhookController {
  constructor(
    private readonly logger: LoggerService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Post('/')
  public async statusCallback(
    @Body()
    {
      status,
      idEmission,
      osChild,
      osParent,
      massiveUUID,
      massiveReference,
    }: IEmissionWebhook,
  ) {
    const payload: ISocketEmissionStatusEvent = {
      status,
      identifier: !massiveUUID ? idEmission : massiveUUID || null,
      massiveReference,
      data: {
        osChild,
        osParent,
      },
    };
    this.logger.log(`websocket to socket | ${JSON.stringify(payload)}`);

    const { identifier } = payload;

    /**
     * * UNITARY FLOW: PRDR <-> EMIT EVENT TO FRONTEND
     * **/
    if (!massiveUUID) {
      // BACKEND EMITE MENSAJE ESCUCHA EMISSIONSTATUS
      this.logger.log(
        `SEND WEBSOCKET UNITARY response from cnsmr emission ${identifier}: ${status}`,
      );
      await this.websocketGateway.emitResponse(identifier, payload);
    } else {
      /**
       * * MASSIVE FLOW: PRDR <-> EMIT EVENT TO FRONTEND
       * **/
      this.logger.log(
        `SEND WEBSOCKET MASSIVE response from cnsmr emission ${identifier}: ${status}`,
      );
      await this.websocketGateway.emitResponse(identifier, payload);
    }

    return {
      status: 'success',
      identifier,
    };
  }
}
