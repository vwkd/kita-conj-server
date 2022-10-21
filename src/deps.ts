export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLUnionType, printSchema } from "https://cdn.skypack.dev/graphql@16.6.0";
export { log } from "https://raw.githubusercontent.com/vwkd/kita-utils/59bcf041c1e7ee6936423e787316dc65c2e5d157/src/logger.ts";

export const entries = [
  {
    id: 1,
    value: {
      PRS: {
        S1: {
          person1: {
            value: "ვ",
          },
          root: {
            value: "წერ",
          },
          person2: {
            value: "თ",
          },
        }
      }
    }
  },
]
