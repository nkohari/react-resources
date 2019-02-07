import { Observable } from './Observable';
import { Fragment } from './types';

/**
 * A data access service which can act as a read-through cache.
 */
export class Resource extends Observable {
  protected fragments: Map<string, Fragment>;

  constructor() {
    super();
    this.fragments = new Map();
  }

  /**
   * Resolves a fragment of data identified by the specified key. If the data has already been
   * loaded, it will be returned. Otherwise, the loader function will be called, and the resulting
   * promise will be thrown so it can be caught by a wrapping Suspense block.
   * @param loader A function which can use an API client to actually load the requested data.
   * @param key A key which uniquely identifies the fragment. (For example, a uuid of a record.)
   * @throws An error, if an error is thrown in the loader function.
   * @throws A suspender (the promise returned by the loader), if the data is not yet loaded.
   */
  resolve<T>(loader: () => Promise<T>, key: string = '__default__'): T {
    let fragment = this.fragments.get(key) as Fragment<T>;

    if (!fragment) {
      const promise = loader();
      fragment = { promise, status: 'loading' };

      promise
        .then(value => {
          if (fragment.status === 'loading') {
            fragment.status = 'ready';
            fragment.value = value;
          }
        })
        .catch(err => {
          if (fragment.status === 'loading') {
            fragment.status = 'error';
            fragment.error = err;
          }
        });

      this.fragments.set(key, fragment);
    }

    if (fragment.status === 'loading') throw fragment.promise;
    if (fragment.status === 'error') throw fragment.error;
    return fragment.value;
  }

  /**
   * Explicitly sets the data that is cached for the specified fragment.
   * @param key The key of the fragment whose value should be set.
   * @param value The value to set for the fragment.
   */
  set<T>(key: string, value: T) {
    this.fragments.set(key, {
      promise: Promise.resolve(value),
      status: 'ready',
      value,
    });
    this.announceChanges();
  }

  /**
   * Removes any cached data for the specified fragment, allowing it to be reloaded
   * the next time it is requested.
   * @param key The key of the fragment to remove.
   */
  remove(key: string) {
    this.fragments.delete(key);
    this.announceChanges();
  }

  /**
   * Clears all cached data, allowing it to be reloaded the next time each fragment
   * is requested.
   */
  clear() {
    this.fragments.clear();
    this.announceChanges();
  }
}
