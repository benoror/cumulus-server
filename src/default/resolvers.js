import { Patient} from '../connectors';

const resolvers = {
  Query: {
    patients: (_, args) => {
      return Patient.find(args);
    }
  },
};

export default resolvers;
