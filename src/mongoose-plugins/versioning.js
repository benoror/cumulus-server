import lodash from 'lodash';

module.exports = exports = function versioningPlugin(schema, options) {
  schema.add({
    _revision: Number,
    _history: [{}]
  });

  schema.post('init', function() {
    if(!lodash.isArray(this._history)) {
      this._history = [];
    }
    let snapshot = lodash.pickBy(this.toObject(), (v, k) => {
      return k !== '_history';
    })
    this._history.push(snapshot);
  });

  schema.pre('save', function(next) {
    this._revision = lodash.isFinite(this._revision) ?
      this._revision + 1 : 0;

    next();
  });
}

