import { Patient } from '../connectors';
import defaultResolvers from '../default/resolvers';
import lodash from 'lodash';

const resolvers = lodash.assign(defaultResolvers, {
  Patient: {
    insuranceAttributes: (_, args) => {
      /*
       * Include insurance.claim as camelCased attributes
       */
      if(_.insurance && _.insurance.claim) {
        lodash.forIn(_.insurance.claim, (value, key) => {
          _.insurance['claim' + lodash.capitalize(key)] = value;
        });
        // delete _.insurance.claim
      }
      return _.insurance;
    }
  },
});

export default resolvers;

