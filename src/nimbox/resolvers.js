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
        lodash.forIn(_.insurance.claim, (v, k) => {
          _.insurance['claim' + lodash.capitalize(k)] = v;
        });
        // delete _.insurance.claim
      }
      return _.insurance;
    }
  },
  Mutation: {
    upsertPatient: (_, args) => {
      /*
       * Map claim camelCased attribute
       */
      if(args.insuranceAttributes) {
        args.insurance = args.insuranceAttributes;
        delete args.insuranceAttributes;
        const claim = {};
        lodash.forIn(args.insurance, (v, k) => {
          if(lodash.startsWith(k, 'claim')) {
            const newKey = lodash.camelCase(lodash.trimStart(k, 'claim'));
            claim[newKey] = v;
            delete args.insurance[k];
          }
        });
        args.insurance.claim = claim;
      }

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
});

export default resolvers;

