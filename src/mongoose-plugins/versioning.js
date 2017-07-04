import lodash from 'lodash';
import deep from 'deep-diff';

function cleanUp(obj) {
  return lodash.pickBy(obj, (v, k) => {
    return !lodash.includes(['_history', '_revision'], k);
  })
}

export default function versioningPlugin(schema, options) {
  schema.add({
    _revision: Number,
    _history: [{}]
  });

  schema.post('init', function() {
    if(!lodash.isArray(this._history)) {
      this._history = [];
    }
    let snapshot = cleanUp(this.toObject());
    this._history.push(snapshot);
  });

  schema.pre('save', function(next) {
    this._revision = lodash.isFinite(this._revision) ?
      this._revision + 1 : 0;

    let last = this._history.pop();
    if(last) {
      let current = cleanUp(this.toObject());
      this._history.push(deep(current, last));
    }

    next();
  });
}

