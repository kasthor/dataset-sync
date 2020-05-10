/* global jest beforeEach describe it expect */

const CollectionSync = require('../dataset-sync/collection_sync.js'),
  Item = require('../dataset-sync/item.js');

describe('CollectionSync', () => {
  describe('constructor', () => {
    it('creates a new object', () => {
      expect(new CollectionSync({})).not.toBeNull();
    });
    it('sets the source', () => {
      const subject = new CollectionSync({ source: { a: 1 }, mirrors: [] });
      expect(subject.source).toBeTruthy();
    });
    it('sets the source', () => {
      const subject = new CollectionSync({ source: { a: 1 }, mirrors: [] });
      expect(subject.mirrors).toBeTruthy();
      expect(subject.mirrors).toBeInstanceOf(Array);
    });
  });
  describe('actions', () => {
    it('returns an add object when object needs to be added', () => {
      const source = new Item({ client: { a: 1, b: 2 } }),
        mirror = new Item({ client: { a: 1 } });

      expect(CollectionSync.actions(source, mirror))
        .resolves.toHaveProperty('add', expect.arrayContaining(['b']));
    });
    it('returns a remove object when object needs to be removed', () => {
      const source = new Item({ client: { a: 1 } }),
        mirror = new Item({ client: { a: 1, b: 1 } });

      expect(CollectionSync.actions(source, mirror))
        .resolves.toHaveProperty('remove', expect.arrayContaining(['b']));
    });
    it('returns an update object when an object needs to be updated', () => {
      const source = new Item({ client: { a: 1, b: 1 } }),
        mirror = new Item({ client: { a: 1, b: 2 } });

      expect(CollectionSync.actions(source, mirror))
        .resolves.toHaveProperty('update', expect.arrayContaining(['b']));
    });
  });
  describe('getUpdates', () => {
    it('returns the key that is different', () => {
      const source = new Item({ client: { a: 1, b: 1 } }),
        mirror = new Item({ client: { a: 1, b: 2 } });

      expect(CollectionSync.getUpdates(source, mirror)).resolves.toContain('b');
    });
    it('returns the key that is different', () => {
      const source = new Item({ client: { a: 1, b: 1, c: 1 } }),
        mirror = new Item({ client: { a: 1, b: 2 } });

      expect(CollectionSync.getUpdates(source, mirror)).resolves.toContain('b');
      expect(CollectionSync.getUpdates(source, mirror)).resolves.not.toContain('c');
    });
    it('returns the key that is different', () => {
      const source = new Item({ client: { a: 1, b: 1 } }),
        mirror = new Item({ client: { a: 1, b: 2, c: 3 } });

      expect(CollectionSync.getUpdates(source, mirror)).resolves.toContain('b');
      expect(CollectionSync.getUpdates(source, mirror)).resolves.not.toContain('c');
    });
  });
  describe('filter', () => {
    it('returns true if element match', () => {
      expect(CollectionSync.filter({ a: '1' }, { a: '1' })).toBeTrue();
    });
    it('returns false if element does not match', () => {
      expect(CollectionSync.filter({ a: '1' }, { b: '1' })).toBeFalse();
    });
    it('returns true if element match but has more values', () => {
      expect(CollectionSync.filter({ a: '1' }, { a: '1', b: '2' })).toBeTrue();
    });
  });
  describe('get', () => {
    let source,
      mirrors,
      subject;

    beforeEach(() => {
      source = new Item({ client: { a: 1, b: 1, c: 1 } });
      mirrors = [new Item({ client: { a: 1, b: 2 } })];
      subject = new CollectionSync({ source, mirrors });
    });

    // eslint-disable-next-line arrow-body-style
    it('gets an existing value', () => {
      return expect(subject.get('a')).resolves.toEqual(1);
    });

    // eslint-disable-next-line arrow-body-style
    it('resolves null if not found in mirror or source', () => {
      return expect(subject.get('z')).resolves.toBeNull();
    });
    it('returns value from source if not present in mirror', async () => {
      const logger = jest.fn();
      subject = new CollectionSync({ source, mirrors, logger });
      await expect(subject.get('c')).resolves.toEqual(1);
      expect(logger).toHaveBeenCalledWith({ code: 'mirror_miss_source_hit' });
    });
  });
  describe('sync', () => {
    it('add to mirror the items that are in source but not in mirror', () => {
      const subject = new CollectionSync({
        source: new Item({ client: { a: 1, b: 2 } }),
        mirrors: [new Item({ client: { a: 1 } })],
      });

      subject.sync().then(() => {
        expect(subject.mirrors[0].obj)
          .toEqual(expect.objectContaining({ a: 1, b: 2 }));
      });
    });
    it('removes from mirror the items that are not in source', () => {
      const subject = new CollectionSync({
        source: new Item({ client: { a: 1 } }),
        mirrors: [new Item({ client: { a: 1, b: 2 } })],
      });

      subject.sync().then(() => {
        expect(subject.mirrors[0].obj)
          .toEqual(expect.objectContaining({ a: 1 }));
      });
    });
    it('update items on mirror when they are different in source', () => {
      const subject = new CollectionSync({
        source: new Item({ client: { a: 1, b: 1 } }),
        mirrors: [new Item({ client: { a: 1, b: 2 } })],
      });

      subject.sync().then(() => {
        expect(subject.mirrors[0].obj)
          .toEqual(expect.objectContaining({ b: 1 }));
      });
    });
  });
});
