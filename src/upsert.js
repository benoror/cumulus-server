import lodash from 'lodash';

export default function upsert(Model, args) {
  return Model.findOne({
    identityNumber: args.identityNumber
  }).then((p) => {
    if(!p) {
      p = new Model(args);
    } else {
      lodash.merge(p, args);
    }
    return p.save();
  }).catch((e) => {
    console.log("Error: could not save patient: " + e);
  });
}
