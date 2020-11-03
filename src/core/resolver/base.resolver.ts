import { Resolver } from '@nestjs/graphql';
import { BaseService } from '../service/base.service';
import { AppBaseEntity } from '../entity/base.entity';

@Resolver()
export default class BaseResolver<T extends AppBaseEntity> {
  constructor(private service: BaseService<T>) {}
}
