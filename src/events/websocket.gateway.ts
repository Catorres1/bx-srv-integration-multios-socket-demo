import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ISocketEmissionStatusEvent } from '#commons/interfaces';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/api/integration/multios/emission/websocket',
  transports: ['websocket', 'polling'],
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createRoom')
  createRoom(
    client: Socket,
    data: { idEmission: string },
  ): WsResponse<unknown> {
    Logger.log(
      `[createRoom] socket.io ${client.id} - joining to the room idEmission ${data.idEmission}`,
    );
    client.join(data.idEmission);
    client.to(data.idEmission).emit('createRoom', { room: data.idEmission });
    return { event: 'createRoom', data: data.idEmission };
  }

  async emitResponse(idEmission: string, payload: ISocketEmissionStatusEvent) {
    Logger.log(
      `[socketResponse] socket.io ${idEmission} - send message to frontend ${JSON.stringify(
        payload,
      )}`,
    );
    this.server.to(idEmission).emit('emissionStatus', payload);
  }
}
