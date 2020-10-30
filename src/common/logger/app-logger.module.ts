import { Module } from '@nestjs/common';
import { AppLoggerService } from './service/app-logger.service';


@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {
}