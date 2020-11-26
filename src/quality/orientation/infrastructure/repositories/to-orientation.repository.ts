import { IOrientation } from '../../domain/orientation.factory';
import { AbstractTypeOrmRepository } from 'src/shared/modules/database/typeorm/repository.abstract';

export class TypeOrmOrientationRepository extends AbstractTypeOrmRepository<
  IOrientation
> {
  cosa() {}
}
