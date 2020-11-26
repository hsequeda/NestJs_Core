import { Module } from '@nestjs/common';
import { OrientationModule } from './orientation/orientation.module';

@Module({
  imports: [OrientationModule]
})
export class QualityModule {}
