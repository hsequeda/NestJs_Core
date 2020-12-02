import { Module } from '@nestjs/common';
import { DataAccessProviders } from './data-access.providers';

@Module({
  imports: [...DataAccessProviders],
  exports: [...DataAccessProviders],
})
export class DataAccessModule {}
