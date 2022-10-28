import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLUnionType } from "./deps.ts";
import { database } from "./database.ts"

// --------- RESOLVER ---------

function entryResolver(_, { id }) {

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
    isException: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    note: {
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
    modus: {
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

const GRP1Type = new GraphQLObjectType({
  name: "GRP1",
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
  }
});

const GRP2Type = new GraphQLObjectType({
  name: "GRP2",
  fields: {
    FUT: {
      type: new GraphQLNonNull(screeveType),
    },
    COND: {
      type: new GraphQLNonNull(screeveType),
    },
    FUTSUBJ: {
      type: new GraphQLNonNull(screeveType),
    },
  }
});

const SRS1Type = new GraphQLObjectType({
  name: "SRS1",
  fields: {
    GRP1: {
      type: new GraphQLNonNull(GRP1Type),
    },
    GRP2: {
      type: new GraphQLNonNull(GRP2Type),
    },
  }
});

const SRS2Type = new GraphQLObjectType({
  name: "SRS2",
  fields: {
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
  }
});

const SRS3Type = new GraphQLObjectType({
  name: "SRS3",
  fields: {
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
  }
});

const tableType = new GraphQLObjectType({
  name: "Table",
  fields: {
    SRS1: {
      type: new GraphQLNonNull(SRS1Type),
    },
    SRS2: {
      type: new GraphQLNonNull(SRS2Type),
    },
    SRS3: {
      type: new GraphQLNonNull(SRS3Type),
    },
  }
});

const definitionType = new GraphQLObjectType({
  name: "Definition",
  fields: {
    preverb: {
      type: GraphQLString,
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
    },
    root: {
      type: new GraphQLNonNull(GraphQLString),
    },
    thema: {
      type: GraphQLString,
    },
  }
});

const entryType = new GraphQLObjectType({
  name: "Entry",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    definition: {
      type: new GraphQLNonNull(definitionType),
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
