import { IOrientationFactory } from './interfaces/IOrientationFactory';
import { IOrientation } from './interfaces/IOrientation';
import { Result } from 'src/shared/core/Result';
import { Code } from './code.value-object';
import { Description } from './description.value-object';
import { Orientation } from './orientation.entity';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';

export class OrientationFactory implements IOrientationFactory {
  build(code: string, description: string): Result<IOrientation> {
    const codeOrError: Result<Code> = Code.create({ value: code });
    if (!codeOrError.isSuccess) {
      return Result.fail(codeOrError.error);
    }
    const descriptionOrError: Result<Description> = Description.create({
      value: description,
    });
    if (!descriptionOrError.isSuccess) {
      return Result.fail(descriptionOrError.error);
    }

    return Orientation.create(
      {
        code: codeOrError.getValue(),
        description: descriptionOrError.getValue(),
      },
      new UniqueEntityID(),
    );
  }
}
