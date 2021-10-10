import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';

import { schema } from './resolvers';
import * as context from './context';

export const client = new ApolloClient<NormalizedCacheObject>({
  link: new SchemaLink({ schema, context }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todos: {
            /** overwrite previous array when updating todos. */
            merge(_prev, next) {
              return next;
            },
          },
        },
      },
    },
  }),
});
