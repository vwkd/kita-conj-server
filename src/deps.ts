export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLUnionType, printSchema } from "https://cdn.skypack.dev/graphql@16.6.0";
export { log } from "https://raw.githubusercontent.com/vwkd/kita-utils/59bcf041c1e7ee6936423e787316dc65c2e5d157/src/logger.ts";

const entry = {
  id: 1,
  value: {
    PRS: {
      S1: {
        preverb: {
          label: "preverb",
          value: null,
        },
        person1: {
          label: "person1",
          value: "ვ",
        },
        version: {
          label: "version",
          value: "ა",
        },
        root: {
          label: "root",
          value: "კეთ",
        },
        thema: {
          label: "thema",
          value: "ებ",
        },
        person2: {
          label: "person2",
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
for (const label in entry.value.PRS) {
  entry.value.PRS[label] = entry.value.PRS.S1;
}

for (const label in entry.value) {
  entry.value[label] = entry.value.PRS;
}

export const entries = [
  entry
];
