import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /* constructor(private readonly logger: AppLoggerService) { */
  /*   logger.setContext('AppService'); */
  /* } */
  /* onModuleInit(): any { */
  /*   this.logger.error('ERROR'); */
  /*   this.logger.debug('DEBUG'); */
  /*   this.logger.warn('WARN'); */
  /*   this.logger.debug('DEBUG'); */
  /*   this.logger.verbose('VERBOSE'); */
  /* } */
}
