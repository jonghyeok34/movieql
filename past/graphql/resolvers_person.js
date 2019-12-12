import { people, getById } from "../../graphql/db";

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => getById(id)
  }
};

export default resolvers;
