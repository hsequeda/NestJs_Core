import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrientationUseCase } from './create-orientation.use-case';

describe('OrientationResolver', () => {
  let useCase: CreateOrientationUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrientationUseCase],
    }).compile();

    resolver = module.get<CreateOrientationUseCase>(CreateOrientationUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
