import { Module } from '@nestjs/common';
import { graphqlProvider } from './graphql.provider';
import { gqlPubSubProvider } from './gql-pubsub.provider';

@Module({
  imports: [graphqlProvider],
  providers: [gqlPubSubProvider],
  exports: [graphqlProvider, gqlPubSubProvider],
})
export class GraphqlModule {}
