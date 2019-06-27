class CollectionSync {
  static getUpdates(source, mirror) {
    return new Promise((resolve) => {
      Promise.all([source.valuesChecksum(), mirror.valuesChecksum()])
        .then((results) => {
          const [sourceChecksum, mirrorChecksum] = results;

          resolve(Object.keys(sourceChecksum)
            .filter(key => key in mirrorChecksum && sourceChecksum[key] !== mirrorChecksum[key]));
        });
    });
  }

  static actions(source, mirror) {
    return new Promise((resolve) => {
      Promise.all([source.keys(), mirror.keys(), CollectionSync.getUpdates(source, mirror)])
        .then((results) => {
          const [sourceKeys, mirrorKeys, updates] = results;
          resolve({
            add: sourceKeys.filter(i => mirrorKeys.indexOf(i) === -1),
            remove: mirrorKeys.filter(i => sourceKeys.indexOf(i) === -1),
            update: updates,
          });
        });
    });
  }

  constructor(source, ...mirrors) {
    this.source = source;
    this.mirrors = mirrors;
  }

  get mirror() {
    return this.mirrors[Math.floor(Math.random() * this.mirrors.length)];
  }

  get(key) {
    return this.mirror.get(key);
  }

  sync() {
    return new Promise((resolve) => {
      const { source } = this;

      this.mirrors.forEach((mirror) => {
        function set(item) {
          return source.get(item)
            .then(mirror.set.bind(mirror, item));
        }
        function remove(item) {
          return mirror.remove(item);
        }

        CollectionSync.actions(source, mirror)
          .then((actions) => {
            Promise.all([
              ...[...actions.add, ...actions.update].map(set),
              ...actions.remove.map(remove),
            ]).then(resolve);
          });
      });
    });
  }
}

module.exports = CollectionSync;
