import { Patient } from '../connectors';

const resolvers = {
  Query: {
    patients: (_, args) => {
      return Patient.find(args);
    }
  },
  Mutation: {
    addPatient: (_, args) => {
      return Patient.create(args);
    },
  },
};

export default resolvers;
