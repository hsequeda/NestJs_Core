import { Module } from '@nestjs/common';
import { OrientationResolver } from './presentation/resolver/orientation.resolver';

@Module({
  imports: [OrientationResolver],
})
export class ProofParametrizationModule {}
