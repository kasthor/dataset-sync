const KeyNotFoundError = require('./key_not_found_error');


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

  static filter(filter, item) {
    return Object.keys(filter).reduce((res, key) => res || filter[key] === item[key], false);
  }

  constructor({ source, mirrors, logger = null }) {
    this.source = source;
    this.mirrors = mirrors;
    this.logger = logger;
  }

  log(logObject) {
    if (typeof this.logger === 'function') {
      this.logger(logObject);
    }
  }

  filteredMirrors(filter) {
    return filter
      ? this.mirrors.filter(CollectionSync.filter.bind(null, filter))
      : this.mirrors;
  }

  mirror(options = {}) {
    // TODO: test failOverSource
    const { failOverSource, ...filter } = options,
      mirrors = this.filteredMirrors(filter);

    if (failOverSource && mirrors.length <= 0) {
      return this.source;
    }

    return mirrors[Math.floor(Math.random() * mirrors.length)];
  }

  get(key) {
    // TODO: this probably has a more elegant way to be coded
    return this
      .mirror({ read: true, failOverSource: true })
      .get(key)
      .then(val => val, () => this.source
        .get(key)
        .then((value) => {
          this.log({ code: 'mirror_miss_source_hit' });
          return value;
        })
        .catch((err) => { // eslint-disable-line no-shadow
          if (err instanceof KeyNotFoundError) {
            return null;
          }
          throw (err);
        }));
  }

  update(item) {
    const { source } = this;

    return Promise
      .all(
        this.filteredMirrors({ write: true })
          .map(mirror => source
            .get(item)
            .then(mirror.set.bind(mirror, item))
            .catch((err) => {
              if (err instanceof KeyNotFoundError) {
                return mirror.remove(item);
              }

              throw err;
            })),
      );
  }

  sync() {
    return new Promise((resolve) => {
      const { source } = this;

      this.filteredMirrors({ write: true }).forEach((mirror) => {
        function set(item) {
          return source.get(item)
            .then(mirror.set.bind(mirror, item));
        }
        function remove(item) {
          return mirror.remove(item);
        }

        CollectionSync.actions(source, mirror)
          .then((actions) => {
            Promise
              .all([...[...actions.add, ...actions.update].map(set), ...actions.remove.map(remove)])
              .then(resolve);
          });
      });
    });
  }
}

module.exports = CollectionSync;
