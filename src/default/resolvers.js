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
      return Patient.findOne({
        identityNumber: args.identityNumber
      }).then((p) => {
        if(!p) {
          p = new Patient(args);
        } else {
          lodash.merge(p, args);
        }
        return p.save();
      }).catch((e) => {
        console.log("Error: could not save patient: " + e);
      });
      // return Patient.findOneAndUpdate(
      //   {
      //     identityNumber: args.identityNumber
      //   },
      //   args,
      //   {
      //     new: true,
      //     upsert: true
      //   }
      // );
    },
  },
};

export default resolvers;
