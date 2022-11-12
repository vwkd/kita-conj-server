export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLUnionType, printSchema } from "https://cdn.skypack.dev/graphql@16.6.0";
export { log } from "https://raw.githubusercontent.com/vwkd/kita-utils/59bcf041c1e7ee6936423e787316dc65c2e5d157/src/logger.ts";
export { default as definitions } from "https://raw.githubusercontent.com/vwkd/kita-conj-parser/output/vd.json" assert { type: "json" };
export { VOWELS, T_SOUNDS, SOFT_SOUNDS } from "https://raw.githubusercontent.com/vwkd/kita-utils/94e1536c963682ea18ecdf5c177aae5cff144c70/src/constants.ts";
