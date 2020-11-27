import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class OrientationResolver {
  @Query(() => String, {})
  create() {
    return 'Create Orientation';
  }
}
