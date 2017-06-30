import { Patient } from '../connectors';

const resolvers = {
  Query: {
    patients: (_, args) => {
      return Patient.find(args);
    }
  },
  Mutation: {
    upsertPatient: (_, args) => {
      return Patient.findOneAndUpdate(
        {
          identityNumber: args.identityNumber
        },
        args,
        {
          new: true,
          upsert: true
        }
      );
    },
  },
};

export default resolvers;
