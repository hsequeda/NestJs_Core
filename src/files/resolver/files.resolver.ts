import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PubSub } from 'apollo-server-express';

import { FilesService } from '../services/files.service';

@Resolver('File')
export class FilesResolver {
	protected pubsub: any;
	constructor(private service: FilesService) {
		this.pubsub = new PubSub();
	}

}
