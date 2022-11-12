export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export {
  graphql,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
  printSchema,
} from "https://cdn.skypack.dev/graphql@16.6.0";
export { log } from "https://raw.githubusercontent.com/vwkd/kita-utils/59bcf041c1e7ee6936423e787316dc65c2e5d157/src/logger.ts";
export { default as definitions } from "https://raw.githubusercontent.com/vwkd/kita-conj-parser/output/vd.json" assert { type: "json" };
export {
  CONSONANTS,
  SOFT_SOUNDS,
  T_SOUNDS,
  VOWELS,
} from "https://raw.githubusercontent.com/vwkd/kita-utils/9227e3f0e6c62631609e52c4db05841f71632306/src/constants.ts";
