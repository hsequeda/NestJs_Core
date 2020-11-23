import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'tls';
import { AppConfigModule } from '../../config/app-config.module';
import { AppConfigService } from '../../config/service/app-config-service';

export const typeOrmProvider = TypeOrmModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  async useFactory(config: AppConfigService) {
    return {
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      logging: config.app.nodeEnv !== 'production',
      ...config.database,
    } as ConnectionOptions;
  },
});
