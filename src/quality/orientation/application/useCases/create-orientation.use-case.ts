import { Injectable, Inject } from '@nestjs/common';
import { IOrientationFactory } from '../../domain/interfaces/IOrientationFactory';
import { IOrientationRepository } from '../../domain/interfaces/IOrientationRepository';
import { IOrientation } from '../../domain/interfaces/IOrientation';
import { CreateOrientationDto } from '../dto/create-orientation.dto';
import { Result, Either } from 'src/shared/core/Result';
import { UnknownError } from 'src/shared/core/errors/UnknownError';

export type CreateOrientationResponse = Either<UnknownError, IOrientation>;

@Injectable()
export class CreateOrientationUseCase {
  constructor(
    @Inject('IOrientationFactory')
    private readonly _orientationFactory: IOrientationFactory,
    @Inject('IOrientationRepository')
    private readonly _orientationRepository: IOrientationRepository,
  ) {}

  async execute(data: CreateOrientationDto): Promise<IOrientation> {
    const orientationOrError: Result<IOrientation> = this._orientationFactory.build(
      data.code,
      data.description,
    );
    if (orientationOrError.isFailure) {
      return;
    }

    try {
      await this._orientationRepository.create(
        orientationOrError.getValue(),
        data.companyId,
      );
    } catch (err) {
      return;
    }

    return orientationOrError.getValue();
  }
}
