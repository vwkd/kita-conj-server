export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType, GraphQLUnionType, GraphQLBoolean, printSchema } from "https://cdn.skypack.dev/graphql@16.6.0";
export { default as definitions } from "https://raw.githubusercontent.com/vwkd/kita-conj-parser/output/vd.json" assert { type: "json" };
export { log } from "https://raw.githubusercontent.com/vwkd/kita-utils/59bcf041c1e7ee6936423e787316dc65c2e5d157/src/logger.ts";
