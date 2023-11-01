import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('liveness')
  liveness(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('liveness OK');
  }

  @Get('readiness')
  readiness(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('readiness OK');
  }
}
