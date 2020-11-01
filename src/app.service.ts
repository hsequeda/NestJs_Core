import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { AppLoggerService } from './common/logger/service/app-logger.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly logger: AppLoggerService) {
    logger.setContext('APP-CONTROLLER');
  }
  onModuleInit(): any {
    this.logger.error('ERROR');
    this.logger.debug('DEBUG');
    this.logger.warn('WARN');
    this.logger.debug('DEBUG');
    this.logger.verbose('VERBOSE');
  }
}
