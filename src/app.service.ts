import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { AppLoggerService } from './logger/service/app-logger.service';

@Injectable()
export class AppService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly logger: AppLoggerService) {
    logger.setContext('AppService');
  }
  onModuleInit(): any {
    this.logger.error('ERROR');
    this.logger.debug('DEBUG');
    this.logger.warn('WARN');
    this.logger.debug('DEBUG');
    this.logger.verbose('VERBOSE');
  }
}
