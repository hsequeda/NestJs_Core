import { Test, TestingModule } from '@nestjs/testing';
import { OrientationResolver } from './orientation.resolver';

describe('OrientationResolver', () => {
  let resolver: OrientationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrientationResolver],
    }).compile();

    resolver = module.get<OrientationResolver>(OrientationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
