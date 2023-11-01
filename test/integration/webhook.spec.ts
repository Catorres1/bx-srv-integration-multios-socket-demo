import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'socket.io';

import { LoggerService } from '#commons';
import { IEmissionWebhook } from '#commons/interfaces';
import { WebhookController } from '#controllers';
import { WebsocketGateway } from '#events';

describe('WebhookController', () => {
  let webhookController: WebhookController;
  let websocketGateway: WebsocketGateway;

  let loggerService: LoggerService;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      {},
    ).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    loggerService = new LoggerService();
    websocketGateway = new WebsocketGateway();
    websocketGateway.server = new Server({
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      path: '/api/integration/multios/emission/websocket',
      transports: ['websocket', 'polling'],
    });
    webhookController = new WebhookController(loggerService, websocketGateway);
  });

  describe('statusCallback', () => {
    it('should return emission status from webhook', async () => {
      const mockWebhookBody: IEmissionWebhook = {
        status: true,
        idEmission: '653fd21242492547d88c4d9d',
        osChild: ['8000295310'],
        osParent: '8000295321',
        massiveUUID: '652fef05b65bc4fe2c4f820d',
        massiveReference: '2',
      };
      const mockWebhookResponse = {
        status: 'success',
        identifier: '652fef05b65bc4fe2c4f820d',
      };

      const result = await webhookController.statusCallback(mockWebhookBody);

      expect(result).toEqual(mockWebhookResponse);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
