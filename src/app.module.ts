import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { QualityModule } from './quality/quality.module';
import { StpModule } from './stp/stp.module';
import { InventoryModule } from './inventory/inventory.module';
import { AppConfigModule } from './shared/modules/config/app-config.module';
import { GraphqlModule } from './shared/modules/graphql/graphql.module';

@Module({
  imports: [
    AppConfigModule,
    QualityModule,
    StpModule,
    InventoryModule,
    GraphqlModule,
  ],

  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
