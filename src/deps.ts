export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType, GraphQLUnionType, GraphQLBoolean, printSchema } from "https://cdn.skypack.dev/graphql@16.6.0";

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
    AORIMPF: null,
    OPT: null,
    OPTIMPF: null,
    PERF: null,
    PERFIMPF: null,
    PLUPERF: null,
    PLUPERFIMPF: null,
    PERFSUBJ: null,
    PERFSUBJIMPF: null,
    INF: null,
    INFIMPF: null,
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
