import { makeExecutableSchema } from '@graphql-tools/schema';

import Schema from './client.schema.graphql';

import type * as context from './context';

// graphql schema からインスタンスを作成
// https://www.graphql-tools.com/docs/generate-schema
export const schema = makeExecutableSchema<typeof context>({
  typeDefs: Schema.loc.source.body,
  resolvers: {
    Query: {
      async todos(_, __, context) {
        return context.getTodos();
      },
    },
    Mutation: {
      async createTodo(_, { input: { name, complete = false } }, context) {
        return context.addTodo({ name, complete });
      },
      async updateTodo(_, { input: { todoId, name, complete } }, context) {
        return context.updateTodo({ id: todoId, name, complete });
      },
      async deleteTodo(_, { input: { todoId } }, context) {
        await context.deleteTodo(todoId);
        return context.getTodos();
      },
    },
  },
});
