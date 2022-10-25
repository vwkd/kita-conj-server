import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLEnumType, GraphQLUnionType, GraphQLBoolean } from "./deps.ts";
import { database } from "./database.ts"

// --------- RESOLVER ---------

async function entryResolver(_, { id }) {

  // TODO: assert ID is provided, is ID type
  // TODO: error handling entry with id does not exist
  
  return database.entry(id);
}

// --------- SCHEMA ---------

// BEWARE: definitions must be in order from leaf types all the way up to root type

const componentType = new GraphQLObjectType({
  name: "Component",
  fields: {
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      type: GraphQLString,
    },
  }
});

const formType = new GraphQLObjectType({
  name: "Form",
  fields: {
    // todo: add object persons, add other verb form components
    preverb: {
      type: new GraphQLNonNull(componentType),
    },
    person1: {
      type: new GraphQLNonNull(componentType),
    },
    version: {
      type: new GraphQLNonNull(componentType),
    },
    root: {
      type: new GraphQLNonNull(componentType),
    },
    thema: {
      type: new GraphQLNonNull(componentType),
    },
    person2: {
      type: new GraphQLNonNull(componentType),
    },
  }
});

const screeveType = new GraphQLObjectType({
  name: "Screeve",
  fields: {
    S1: {
      type: new GraphQLNonNull(formType),
    },
    S2: {
      type: new GraphQLNonNull(formType),
    },
    S3: {
      type: new GraphQLNonNull(formType),
    },
    P1: {
      type: new GraphQLNonNull(formType),
    },
    P2: {
      type: new GraphQLNonNull(formType),
    },
    P3: {
      type: new GraphQLNonNull(formType),
    },
  }
});

const tableType = new GraphQLObjectType({
  name: "Table",
  fields: {
    PRS: {
      type: new GraphQLNonNull(screeveType),
    },
    IMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    PRSSUBJ: {
      type: new GraphQLNonNull(screeveType),
    },
    FUT: {
      type: new GraphQLNonNull(screeveType),
    },
    COND: {
      type: new GraphQLNonNull(screeveType),
    },
    FUTSUBJ: {
      type: new GraphQLNonNull(screeveType),
    },
    AOR: {
      type: new GraphQLNonNull(screeveType),
    },
    AORIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    OPT: {
      type: new GraphQLNonNull(screeveType),
    },
    OPTIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    PERF: {
      type: new GraphQLNonNull(screeveType),
    },
    PERFIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    PLUPERF: {
      type: new GraphQLNonNull(screeveType),
    },
    PLUPERFIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    PERFSUBJ: {
      type: new GraphQLNonNull(screeveType),
    },
    PERFSUBJIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    IMPAFF: {
      type: new GraphQLNonNull(screeveType),
    },
    IMPAFFIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    IMPPRB1: {
      type: new GraphQLNonNull(screeveType),
    },
    IMPPRB1IMPF: {
      type: new GraphQLNonNull(screeveType),
    },
    IMPPRB2: {
      type: new GraphQLNonNull(screeveType),
    },
    INF: {
      type: new GraphQLNonNull(screeveType),
    },
    INFIMPF: {
      type: new GraphQLNonNull(screeveType),
    },
  }
});

const entryType = new GraphQLObjectType({
  name: "Entry",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: new GraphQLNonNull(tableType),
    },
  }
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    entry: {
      type: entryType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: entryResolver,
    },
  },
});

export const schema = new GraphQLSchema({
  query: queryType,
});
