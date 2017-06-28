import { Patient } from '../connectors';
import lodash from 'lodash';

const resolvers = {
  Query: {
    patients: (_, args) => {
      return Patient.find(args);
    }
  },
  Patient: {
    insuranceAttributes: (_, args) => {
      if(_.insurance && _.insurance.claim) {
        lodash.forIn(_.insurance.claim, (value, key) => {
          _.insurance['claim' + lodash.capitalize(key)] = value;
        });
        delete _.insurance.claim
      }

      return _.insurance || null;
    }
  }
};

export default resolvers;

