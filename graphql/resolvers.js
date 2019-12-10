const jonghyeok = {
  name: "Jonghyeok",
  age: 15,
  gender: "male"
};

const resolvers = {
  // Query: {
  //   name: () => "jonghyeok"
  // },
  Query: {
    person: () => jonghyeok
  }
};

export default resolvers;
