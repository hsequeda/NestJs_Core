import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app-config.module';
import { AppConfigService } from 'src/config/service/app-config-service';
import { ConnectionOptions } from 'tls';

export default TypeOrmModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  async useFactory(config: AppConfigService) {
    return {
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      ...config.database,
    } as ConnectionOptions;
  },
});
