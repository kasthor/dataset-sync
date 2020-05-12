/* global jest, beforeEach describe it expect */

const Sync = require('../dataset-sync/sync.js');

jest.mock('../dataset-sync/collection_sync');

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

    it('gets a value from mirror', () => { // eslint-disable-line arrow-body-style
      subject.items.a.get.mockResolvedValue();

      return subject.get('a', 'x')
        .then(() => {
          expect(subject.items.a.get).toHaveBeenCalledWith('x');
        });
    });

    it('sends error if wrong collection is called', () => { // eslint-disable-line arrow-body-style
      return expect(subject.get('b', 'x')).toReject();
    });
  });

  describe('sync', () => {
    let subject;
    beforeEach(() => {
      subject = new Sync({
        source: {},
        mirrors: [{}],
        collections: ['a', 'b'],
      });
    });

    it('calls sync on the mirror for all collections if no collection is specified', () => {
      subject.sync();

      expect(subject.items.a.sync).toHaveBeenCalled();
      expect(subject.items.b.sync).toHaveBeenCalled();
    });

    it('calls update on the mirror if collection and id is specified', () => {
      subject.sync('a', 'a');

      expect(subject.items.a.update).toHaveBeenCalledWith('a');
    });

    it('calls sync on the mirror if collection is specified', () => {
      subject.sync('a');

      expect(subject.items.a.sync).toHaveBeenCalled();
      expect(subject.items.b.sync).not.toHaveBeenCalled();
    });
  });
});
