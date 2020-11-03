import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger;
  constructor() {
    this.logger = new Logger('Controller');
  }
  getHello(): string {
    this.logger.log('cosa');
    this.logger.warn('cosa');
    this.logger.error('cosa');
    this.logger.verbose('cosa');
    this.logger.debug('cosa');
    return 'Hello World!';
  }
}
