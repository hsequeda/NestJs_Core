import { Resolver, } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { BaseEntity } from '../entity/base.entity';
import { BaseService } from '../service/base.service';


@Resolver()
export default class BaseResolver<T extends BaseEntity> {
	public pubsub: any;
	constructor(private service: BaseService<T>) {
		this.pubsub = new PubSub();
	}
}







