import { GraphQLModule } from '@nestjs/graphql';
import { AppConfigService } from '../config/service/app-config-service';
import { NodeEnv } from '../config/utils/nodeEnv.enum';
import * as depthLimit from 'graphql-depth-limit';

export const graphqlProvider = GraphQLModule.forRootAsync({
  inject: [AppConfigService],
  async useFactory(config: AppConfigService) {
    return {
      autoSchemaFile: config.graphql.schema,
      installSubscriptionHandlers: true,
      playground: config.app.nodeEnv !== NodeEnv.PRODUCTION,
      debug: config.app.nodeEnv !== NodeEnv.PRODUCTION,
      introspection: config.app.nodeEnv !== NodeEnv.PRODUCTION,
      cors: config.app.cors,
      fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
      validationRules: [depthLimit(config.graphql.depthLimit)],
      context: ({
        req,
        connection,
      }: {
        req: Request;
        connection: any;
      }): { req: Request } => {
        // Return connection context when is a Subscription
        return connection ? { req: connection.context } : { req };
      },
      subscriptions: {
        onConnect: (connectionParams: unknown) => {
          return { connectionParams };
        },
      },
      uploads: {
        maxFileSize: config.graphql.maxFileSize,
        maxFiles: config.graphql.maxFiles,
      },
    };
  },
});
