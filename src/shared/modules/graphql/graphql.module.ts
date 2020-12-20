import { Module, Global } from '@nestjs/common';
import { graphqlProvider } from './graphql.provider';
import { gqlPubSubProvider } from './gql-pubsub.provider';

@Global()
@Module({
  imports: [graphqlProvider],
  providers: [gqlPubSubProvider],
  exports: [graphqlProvider, gqlPubSubProvider],
})
export class GraphqlModule {}
