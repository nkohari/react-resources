import { inject } from '../inject';
import { BarService, FooService } from './mocks';

describe('inject', () => {
  it('sets the dependencies on the decorated class in a static array', () => {
    const decoratedClass = inject(FooService)(BarService);
    expect(decoratedClass).toBe(BarService);
    expect(decoratedClass.__dependencies).toEqual([FooService]);
  });
});
