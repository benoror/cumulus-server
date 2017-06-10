import casual from 'casual';
import _ from 'lodash';

casual.seed('foobar');

export const resolvers = {
  Query: {
    patients: () => _.times(10, () => {
      return {
        id: casual.uuid,
        identityNumber: casual.integer(100000000, 999999999),
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
        phone: casual.phone,
        phoneAlt: casual.phone,
        //dateOfBirth: casual.date(format = 'YYYY-MM-DD'),
        gender: () => casual.coin_flip ? 'm' : 'g',
        address: casual.address,
        address1: casual.address1,
        zip: casual.zip,
        city: casual.city,
        state: casual.state,
        country: casual.country
      };
    })
  },
};
