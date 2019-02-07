import { TestResource } from './mocks';

const RECORDS = {
  123: { name: 'Record 1' },
  456: { name: 'Record 2' },
};

const loadRecord = (id: string) => () => Promise.resolve(RECORDS[id]);

describe('Resource', () => {
  describe('resolve()', () => {
    describe('if data for a fragment has not been loaded', () => {
      it('throws the Promise returned by the loader function', () => {
        const resource = new TestResource();
        const func = () => {
          resource.resolve(loadRecord('123'), '123');
        };
        expect(func).toThrow(Promise);
      });
    });

    describe('if data for a fragment has already been loaded', () => {
      it('returns the data', () => {
        const resource = new TestResource();
        const record = RECORDS['123'];
        resource.set('123', record);
        const data = resource.resolve(loadRecord('123'), '123');
        expect(data).toBe(record);
      });
    });
  });

  describe('remove()', () => {
    it('removes any loaded data for the fragment', () => {
      const resource = new TestResource();
      resource.set('123', RECORDS['123']);
      expect(resource.getFragment('123')).not.toBeUndefined();
      resource.remove('123');
      expect(resource.getFragment('123')).toBeUndefined();
    });
  });

  describe('clear()', () => {
    it('removes all loaded data for all fragments', () => {
      const resource = new TestResource();
      resource.set('123', RECORDS['123']);
      resource.set('456', RECORDS['456']);
      expect(resource.getFragment('123')).not.toBeUndefined();
      expect(resource.getFragment('456')).not.toBeUndefined();
      resource.clear();
      expect(resource.getFragment('123')).toBeUndefined();
      expect(resource.getFragment('456')).toBeUndefined();
    });
  });
});
