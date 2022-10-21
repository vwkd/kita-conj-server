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

const person1Type = new GraphQLObjectType({
  name: "Person1",
  fields: {
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

const rootType = new GraphQLObjectType({
  name: "Root",
  fields: {
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

const person2Type = new GraphQLObjectType({
  name: "Person2",
  fields: {
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

const subjectS1Type = new GraphQLObjectType({
  name: "PRS",
  fields: {
    // todo: add object persons, add other verb form components
    person1: {
      type: new GraphQLNonNull(person1Type),
    },
    root: {
      type: new GraphQLNonNull(rootType),
    },
    thema: {
      type: new GraphQLNonNull(themaType),
    },
    person2: {
      type: new GraphQLNonNull(person2Type),
    },
  }
});

const presentType = new GraphQLObjectType({
  name: "PRS",
  fields: {
    // todo: add other subject persons
    S1: {
      type: new GraphQLNonNull(subjectS1Type),
    },
  }
});


const valueType = new GraphQLObjectType({
  name: "Value",
  fields: {
    // todo: add series and groups, add other screeves
    PRS: {
      type: new GraphQLNonNull(presentType),
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
      type: new GraphQLNonNull(valueType),
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
