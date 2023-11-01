import { Module } from '@nestjs/common';
import { LoggerService } from '@/commons';

@Module({
  providers: [{ provide: 'LOGGER_SERVICE', useClass: LoggerService }],
  exports: ['LOGGER_SERVICE'],
})
export class SharedModule {}
