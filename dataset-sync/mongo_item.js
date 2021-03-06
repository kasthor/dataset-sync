const { ObjectId } = require('mongodb'),
  Item = require('./item');

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
    return this.collection
      .findOne({ _id: ObjectId(key) })
      .then(Item.notFoundErrorIfNull);
  }

  _keys() {
    return this.keyValues().then(Object.keys);
  }

  _keyValues() {
    return new Promise((resolve, reject) => {
      this.collection
        .find({})
        .toArray((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(Object.assign({}, ...docs.map(doc => ({ [doc._id.toString()]: doc }))));
          }
        });
    });
  }

  _set(key, value) {
    return this.collection.update({ _id: ObjectId(key) }, { $set: value });
  }

  _remove(key) {
    return this.collection.remove({ _id: ObjectId(key) });
  }
}

module.exports = MongoItem;
