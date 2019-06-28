const Item = require('./item');

class MongoItem extends Item {
  get collection() {
    return this.client.collection(this.collection_name);
  }

  constructor(options = {}) {
    super(options);
    this.client = options.client;
    this.collection_name = options.collection;
  }

  _get(key) {
    return this.collection.findOne({ _id: key });
  }

  _keys() {
    return this.keyValues().then(Object.keys);
  }

  _keyValues() {
    return new Promise((resolve, reject) => {
      this.collection
        .find({})
        .toArray((err, docs) => { if (err) reject(err); else resolve(docs); });
    });
  }

  _set(key, value) {
    return this.collection.update({ _id: key }, { $set: value });
  }

  _remove(key) {
    return this.collection.remove({ _id: key });
  }

}

module.exports = MongoItem;
