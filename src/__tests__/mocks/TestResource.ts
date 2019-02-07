import { Resource } from '../../Resource';
import { Fragment } from '../../types';

export class TestResource extends Resource {
  getFragment(key: string): Fragment {
    return this.fragments.get(key);
  }

  set<T>(key: string, value: T) {
    this.fragments.set(key, {
      promise: Promise.resolve(value),
      status: 'ready',
      value,
    });
  }
}
