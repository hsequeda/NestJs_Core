import { Module } from '@nestjs/common';
import { OrientationResolver } from './infrastructure/resolver/orientation.resolver';

@Module({
  providers: [OrientationResolver],
})
export class OrientationModule {}
