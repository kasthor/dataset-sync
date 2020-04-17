/* global beforeEach describe it expect */

const Item = require('../dataset-sync/item.js');

describe('Item', () => {
  describe('constructor', () => {
    it('can be initialized', () => {
      expect(new Item()).not.toBeNull();
    });
    it('sets an obj', () => {
      const subject = new Item({ client: { a: 1 } });
      expect(subject.obj).toBeTruthy();
    });
  });

  describe('checksum', () => {
    it('returns a checksum from a string', () => {
      expect(typeof Item.checksum('test')).toBe('string');
      expect(Item.checksum('test'))
        .toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    });
  });
  describe('keys', () => {
    it('returns an array of keys', () => {
      const subject = new Item({ client: { a: 1, b: 2 } });

      expect(subject.keys()).resolves.toEqual(expect.arrayContaining(['a', 'b']));
    });
  });
  describe('keysChecksum', () => {
    let subject;
    beforeEach(() => {
      subject = new Item({ client: { a: 1, b: 2 } });
    });
    it('returns a checksum from all keys', () => {
      expect(subject.keysChecksum()).resolves.toBeString();
    });
  });
  describe('valuesChecksum', () => {
    let subject;
    beforeEach(() => {
      subject = new Item({ client: { a: 1, b: 2 } });
    });
    it('returns a checksum from all keys', (done) => {
      subject.valuesChecksum().then((checksum) => {
        expect(checksum).toBeObject();
        expect(checksum).toContainKeys(['a', 'b']);
        expect(checksum.a).toEqual(Item.checksum(String(1)));
        done();
      });
    });
  });
  describe('get', () => {
    it('returns the value of the item', () => {
      const subject = new Item({ client: { a: 1 } });
      expect(subject.get('a')).resolves.toEqual(1);
    });
  });
  describe('set', () => {
    it('sets the value on the item', (done) => {
      const subject = new Item();
      subject.set('a', 1).then(() => {
        expect(subject.get('a')).resolves.toEqual(1);
        done();
      });
    });
  });

  describe('cannot read', () => {
    let subject;
    beforeEach(() => {
      subject = new Item({ client: { a: 1, b: 2 }, read: false });
    });
    describe('get', () => {
      it('rejects', () => {
        expect(subject.get('a')).toReject();
      });
    });
    describe('keys', () => {
      it('rejects', () => {
        expect(subject.keys()).toReject();
      });
    });
    describe('keyValues', () => {
      it('rejects', () => {
        expect(subject.keyValues()).toReject();
      });
    });
    describe('keysChecksum', () => {
      it('rejects', () => {
        expect(subject.keysChecksum()).toReject();
      });
    });
    describe('valuesChecksum', () => {
      it('rejects', () => {
        expect(subject.valuesChecksum()).toReject();
      });
    });
  });

  describe('cannot write', () => {
    let subject;
    beforeEach(() => {
      subject = new Item({ client: { a: 1, b: 2 }, write: false });
    });
    describe('set', () => {
      it('rejects', () => {
        expect(subject.set('a', 2)).toReject();
      });
    });
    describe('remove', () => {
      it('rejects', () => {
        expect(subject.remove('a')).toReject();
      });
    });
  });
});
