const patients = [{
  id: 1,
  firstName: 'Ben',
}, {
  id: 2,
  firstName: 'Alex',
}];

export const resolvers = {
  Query: {
    patients: () => {
      return patients;
    },
  },
};
