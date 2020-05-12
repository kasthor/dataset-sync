const ItemFactory = require('./item_factory'),
  CollectionSync = require('./collection_sync');

class Sync {
  constructor(options = {}) {
    const
      collections = options.collections || [],
      mirrorClients = Array.isArray(options.mirrors) ? options.mirrors : [options.mirrors],
      { logger } = options;

    this.items = Object.assign({}, ...collections.map((collection) => {
      const source = ItemFactory.create(options.source, collection),
        mirrors = mirrorClients.map(client => ItemFactory.create(client, collection));
      return { [collection]: new CollectionSync({ source, mirrors, logger }) };
    }));
  }

  get(collection, key) {
    const item = this.items[collection];
    if (item) return item.get(key);

    return Promise.reject(new Error('collection not found'));
  }

  sync(collection, id) {
    if (collection && collection in this.items) {
      if (id) {
        // If a collection and an ID is specified then update only that id
        return this.items[collection].update(id);
      }

      // If a collection is specified but no ID, then update the collection
      return this.items[collection].sync();
    }

    // If no collection or id is specified then sync all collections
    return Promise.all(Object.keys(this.items).map(k => this.items[k].sync()));
  }
}

module.exports = Sync;
