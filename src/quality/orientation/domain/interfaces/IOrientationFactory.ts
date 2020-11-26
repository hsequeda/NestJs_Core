import { IOrientation } from './IOrientation';
import { Result } from 'src/shared/core/Result';

export interface IOrientationFactory {
  build(code: string, description: string): Result<IOrientation>;
}

