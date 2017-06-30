import { Patient } from '../connectors';
import lodash from 'lodash';

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
        lodash.assign(args, {
          modifiedAt: Date.now(),
        }),
        {
          new: true,
          upsert: true
        }
      );
    },
  },
};

export default resolvers;
