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
      S2: {
        preverb: {
          key: "preverb",
          value: null,
        },
        person1: {
          key: "person1",
          value: null,
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
      S3: {
        preverb: {
          key: "preverb",
          value: null,
        },
        person1: {
          key: "person1",
          value: null,
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
          value: "ს",
        },
      },
      P1: {
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
          value: "თ",
        },
      },
      P2: {
        preverb: {
          key: "preverb",
          value: null,
        },
        person1: {
          key: "person1",
          value: null,
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
          value: "თ",
        },
      },
      P3: {
        preverb: {
          key: "preverb",
          value: null,
        },
        person1: {
          key: "person1",
          value: null,
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
          value: "ენ",
        },
      },
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

// hacked fill of other screeves with PRS
Object.values(entry.value).map(_ => entry.value.PRS);

export const entries = [
  entry
];
