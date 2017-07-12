import { Patient } from '../connectors';
import defaultResolvers from '../default/resolvers';
import lodash from 'lodash';
import upsert from '../upsert';

const caseConv = (obj, to) => {
  const convert = (o) => {
    return lodash.mapKeys(o, (v, k) => {
      /*
       * Convert keys except for the ones beginning with underscore '_'
       */
      return k[0] != '_' ? lodash[`${to}Case`](k) : k;
    });
  };

  if(lodash.isArray(obj)) {
    return lodash.map(obj, (o) => {
      return convert(o.toObject(), to);
    });
  } else {
    return convert(obj, to);
  }
}

const resolvers = lodash.assign(defaultResolvers, {
  Query: {
    patients: (_, args) => {
      /*
       * ToDo: Map phone & phoneAlt to telephone & telephone2
       */
      return Patient.find(caseConv(args, 'camel')).then((patients) => {
        return caseConv(patients, 'snake');
      });
    }
  },
  Patient: {
    person_attributes: (_, args) => {
      if(_.insurance) {
        if(_.insurance.claim) {
          /*
           * Include insurance.claim as snakeCased attributes
           */
          lodash.forIn(_.insurance.claim, (v, k) => {
            _.insurance[`claim_${lodash.snakeCase(k)}`] = v;
          });
          // delete _.insurance.claim
        }
        /*
         * snakeCased insurance attributes
         */
        _.insurance = lodash.mapKeys(_.insurance, (v, k) => {
          return `insurance_${lodash.snakeCase(k)}`;
        });
      }

      return {
        identity_number: _.identity_number,
        insurance_attributes: _.insurance
      };
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

      return upsert(Patient, args);
    },
  },
});

export default resolvers;

