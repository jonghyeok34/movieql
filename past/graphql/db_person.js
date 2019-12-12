export const people = [
  {
    id: 1,
    name: "Jonghyeok",
    age: 15,
    gender: "male"
  },
  { id: 2, name: "Henry", age: 20, gender: "male" },
  { id: 3, name: "Jeniffer", age: 19, gender: "female" },
  { id: 4, name: "Suhyeon", age: 26, gender: "female" },
  { id: 5, name: "Jinsoo", age: 30, gender: "male" },
  { id: 6, name: "Chrstie", age: 29, gender: "female" },
  { id: 7, name: "Charles", age: 32, gender: "male" }
];

export const getById = id => {
  const filteredPerson = people.filter(person => id === person.id);
  return filteredPerson[0];
};
