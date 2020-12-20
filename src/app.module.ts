import { Module } from '@nestjs/common';
import { QualityModule } from './quality/quality.module';
import { StpModule } from './stp/stp.module';
import { InventoryModule } from './inventory/inventory.module';
import { AppConfigModule } from './shared/modules/config/app-config.module';
import { GraphqlModule } from './shared/modules/graphql/graphql.module';
import { CompanyModule } from './shared/modules/company/company.module';
import { DataAccessModule } from './shared/modules/data-access/data-access.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    AppConfigModule,
    QualityModule,
    StpModule,
    InventoryModule,
    GraphqlModule,
    DataAccessModule,
    CompanyModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
