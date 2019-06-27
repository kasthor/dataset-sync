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

  get(key) {
    return this.collection.findOne({ _id: key });
  }

  set(key, value) {
    return this.collection.update({ _id: key }, { $set: value });
  }

  remove(key) {
    return this.collection.remove({ _id: key });
  }

  keys() {
    return this.keyValues().then(Object.keys);
  }

  keyValues() {
    return this.collection.find({});
  }
}

module.exports = MongoItem;
