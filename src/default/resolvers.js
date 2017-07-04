import { Patient } from '../connectors';
import upsert from '../upsert';

const resolvers = {
  Query: {
    patients: (_, args) => {
      return Patient.find(args);
    }
  },
  Mutation: {
    upsertPatient: (_, args) => {
      return upsert(Patient, args);
    },
  },
};

export default resolvers;
