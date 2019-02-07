import { Container } from '../Container';
import { BarService, FooService, ServiceWithDependencies } from './mocks';

describe('Container', () => {
  describe('constructor', () => {
    it('inherits instances from a parent container if one is provided', () => {
      const parent = new Container();
      const foo = new FooService();
      parent.set(FooService, foo);
      const child = new Container(parent);
      const result = child.get(FooService);
      expect(result).toBe(foo);
    });
  });

  describe('get()', () => {
    it('returns an instance of the specified service', () => {
      const container = new Container();
      const foo = container.get(FooService);
      expect(foo).toBeInstanceOf(FooService);
    });

    it('returns the same instance for subsequent requests', () => {
      const container = new Container();
      const foo1 = container.get(FooService);
      const foo2 = container.get(FooService);
      expect(foo1).toBe(foo2);
    });

    it('creates instances of any dependencies defined for the service', () => {
      const container = new Container();
      const service = container.get(ServiceWithDependencies);
      expect(service.foo).toBeInstanceOf(FooService);
      expect(service.bar).toBeInstanceOf(BarService);
    });
  });

  describe('set()', () => {
    it('causes the container to return the specified instance for requests for the service', () => {
      const container = new Container();
      const foo = new FooService();
      container.set(FooService, foo);
      const result = container.get(FooService);
      expect(result).toBe(foo);
    });
  });
});
