import { Module } from '@nestjs/common';
import { ProofParametrizationModule } from './proof-parametrization/proof-parametrization.module';

@Module({
  imports: [ProofParametrizationModule],
  exports: [ProofParametrizationModule],
})
export class QualityModule {}
