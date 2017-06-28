import { Patient} from '../connectors';

const resolvers = {
  Query: {
    patients: (_, args) => {
      return Patient.find(args);
    }
  },
  Patient: {
    insurance: (_, args) => _.insurance || null
  },
  Insurance: {
    claim: (_, args) => _.claim || null
  },
};

export default resolvers;
