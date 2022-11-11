import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLUnionType, log } from "./deps.ts";
import { database } from "./database.ts"

// --------- RESOLVER ---------

function entryResolver(_, { id }) {

  // TODO: assert ID is provided, is ID type
  // TODO: error handling entry with id does not exist
  
  const entry = database.entry(id);
  
  log.debug("database entry:", entry);
  
  return entry;
}

// --------- SCHEMA ---------

// BEWARE: definitions must be in order from leaf types all the way up to root type

const exceptionType = new GraphQLObjectType({
  name: "Exception",
  fields: {
    value: {
      type: GraphQLString,
    },
    note: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

const componentType = new GraphQLObjectType({
  name: "Component",
  fields: {
    value: {
      type: GraphQLString,
    },
  }
});

const componentOrExceptionType = new GraphQLUnionType({
  name: "ComponentOrException",
  types: [
    componentType,
    exceptionType,
  ],
  resolveType(value) {
    if (value.note) {
      return "Exception";
    } else {
      return "Component";
    }
  }
});

const formType = new GraphQLObjectType({
  name: "Form",
  fields: {
    preverb: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
    person1: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
    version: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
    root: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
    thema: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
    modus: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
    person2: {
      type: new GraphQLNonNull(componentOrExceptionType),
    },
  }
});

const formOrExceptionType = new GraphQLUnionType({
  name: "FormOrException",
  types: [
    formType,
    exceptionType,
  ],
  resolveType(value) {
    if (value.root) {
      return "Form";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const subjectType = new GraphQLObjectType({
  name: "Subject",
  fields: {
    S1: {
      type: new GraphQLNonNull(formOrExceptionType),
    },
    S2: {
      type: new GraphQLNonNull(formOrExceptionType),
    },
    S3: {
      type: new GraphQLNonNull(formOrExceptionType),
    },
    P1: {
      type: new GraphQLNonNull(formOrExceptionType),
    },
    P2: {
      type: new GraphQLNonNull(formOrExceptionType),
    },
    P3: {
      type: new GraphQLNonNull(formOrExceptionType),
    },
  }
});

const subjectOrExceptionType = new GraphQLUnionType({
  name: "SubjectOrException",
  types: [
    subjectType,
    exceptionType,
  ],
  resolveType(value) {
    if (value.S1) {
      return "Subject";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const screeveType = new GraphQLObjectType({
  name: "Screeve",
  fields: {
    S1: {
      type: new GraphQLNonNull(subjectOrExceptionType),
    },
    S2: {
      type: new GraphQLNonNull(subjectOrExceptionType),
    },
    S3: {
      type: new GraphQLNonNull(subjectOrExceptionType),
    },
    P1: {
      type: new GraphQLNonNull(subjectOrExceptionType),
    },
    P2: {
      type: new GraphQLNonNull(subjectOrExceptionType),
    },
    P3: {
      type: new GraphQLNonNull(subjectOrExceptionType),
    },
  }
});

const screeveOrExceptionType = new GraphQLUnionType({
  name: "ScreeveOrException",
  types: [
    screeveType,
    exceptionType,
  ],
  resolveType(value) {
    if (value.S1) {
      return "Screeve";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const GRP1Type = new GraphQLObjectType({
  name: "GRP1",
  fields: {
    PRS: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    IMPF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    PRSSUBJ: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
  }
});

const GRP1OrExceptionType = new GraphQLUnionType({
  name: "GRP1OrException",
  types: [
    GRP1Type,
    exceptionType,
  ],
  resolveType(value) {
    if (value.PRS) {
      return "GRP1";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const GRP2Type = new GraphQLObjectType({
  name: "GRP2",
  fields: {
    FUT: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    COND: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    FUTSUBJ: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
  }
});

const GRP2OrExceptionType = new GraphQLUnionType({
  name: "GRP2OrException",
  types: [
    GRP2Type,
    exceptionType,
  ],
  resolveType(value) {
    if (value.FUT) {
      return "GRP2";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const SRS1Type = new GraphQLObjectType({
  name: "SRS1",
  fields: {
    GRP1: {
      type: new GraphQLNonNull(GRP1OrExceptionType),
    },
    GRP2: {
      type: new GraphQLNonNull(GRP2OrExceptionType),
    },
  }
});

const SRS1OrExceptionType = new GraphQLUnionType({
  name: "SRS1OrException",
  types: [
    SRS1Type,
    exceptionType,
  ],
  resolveType(value) {
    if (value.GRP1) {
      return "SRS1";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const SRS2Type = new GraphQLObjectType({
  name: "SRS2",
  fields: {
    AOR: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    AORIMPF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    OPT: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    OPTIMPF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
  }
});

const SRS2OrExceptionType = new GraphQLUnionType({
  name: "SRS2OrException",
  types: [
    SRS2Type,
    exceptionType,
  ],
  resolveType(value) {
    if (value.AOR) {
      return "SRS2";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const SRS3Type = new GraphQLObjectType({
  name: "SRS3",
  fields: {
    PERF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    PERFIMPF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    PLUPERF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    PLUPERFIMPF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    PERFSUBJ: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
    PERFSUBJIMPF: {
      type: new GraphQLNonNull(screeveOrExceptionType),
    },
  }
});

const SRS3OrExceptionType = new GraphQLUnionType({
  name: "SRS3OrException",
  types: [
    SRS3Type,
    exceptionType,
  ],
  resolveType(value) {
    if (value.PERF) {
      return "SRS3";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const tableType = new GraphQLObjectType({
  name: "Table",
  fields: {
    SRS1: {
      type: new GraphQLNonNull(SRS1OrExceptionType),
    },
    SRS2: {
      type: new GraphQLNonNull(SRS2OrExceptionType),
    },
    SRS3: {
      type: new GraphQLNonNull(SRS3OrExceptionType),
    },
  }
});

const tableOrExceptionType = new GraphQLUnionType({
  name: "TableOrException",
  types: [
    tableType,
    exceptionType,
  ],
  resolveType(value) {
    if (value.SRS1) {
      return "Table";
    }
    if (value.note) {
      return "Exception";
    }
  }
});

const definitionType = new GraphQLObjectType({
  name: "Definition",
  fields: {
    category: {
      type: new GraphQLNonNull(GraphQLInt),
    },
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
    obj: {
      type: new GraphQLNonNull(GraphQLString),
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
      type: new GraphQLNonNull(tableOrExceptionType),
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
