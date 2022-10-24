export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType, GraphQLUnionType, GraphQLBoolean, printSchema } from "https://cdn.skypack.dev/graphql@16.6.0";

const entry = {
  id: 1,
  value: {
    PRS: {
      S1: {
        preverb: {
          key: "preverb",
          value: null,
        },
        person1: {
          key: "person1",
          value: "ვ",
        },
        version: {
          key: "version",
          value: "ა",
        },
        root: {
          key: "root",
          value: "კეთ",
        },
        thema: {
          key: "thema",
          value: "ებ",
        },
        person2: {
          key: "person2",
          value: null,
        },
      },
      S2: null,
      S3: null,
      P1: null,
      P2: null,
      P3: null,
    },
    IMPF: null,
    PRSSUBJ: null,
    FUT: null,
    COND: null,
    FUTSUBJ: null,
    AOR: null,
    OPT: null,
    PERF: null,
    PLUPERF: null,
    PERFSUBJ: null,
  }
};

// hack: fill with placeholder, screeves with PRS, forms with S1
for (const key in entry.value.PRS) {
  entry.value.PRS[key] = entry.value.PRS.S1;
}

for (const key in entry.value) {
  entry.value[key] = entry.value.PRS;
}

export const entries = [
  entry
];
