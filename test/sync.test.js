/* global beforeEach describe it expect */

const Sync = require('../lib/sync.js');

describe('sync', () => {
  describe('constructor', () => {
    it('return an object', () => {
      expect(new Sync()).not.toBeNull();
    });

    it('sets the items', () => {
      const subject = new Sync({
        source: {},
        mirrors: {},
        collections: ['a'],
      });

      expect(subject.items).toBeObject();
      expect(subject.items).toContainKeys(['a']);
    });
  });

  describe('get', () => {
    let subject;

    beforeEach(() => {
      subject = new Sync({ source: {}, mirrors: { x: 1 }, collections: ['a'] });
    });

    it('gets a value from mirror', () => {
      expect(subject.get('a', 'x')).resolves.toBe(1);
    });

    it('gets a value from mirror', () => {
      expect(subject.get('a', 'x')).resolves.toBe(1);
    });

    it('sends error if wrong collection is called', () => {
      expect(subject.get('b', 'x')).toReject();
    });
  });
});
