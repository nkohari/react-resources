import { ServiceClass } from './types';

/**
 * Indicates that when the Container creates an instance of the decorated
 * class, it should resolve instances of the specified services and pass
 * them as arguments to the decorated services' constructor.
 * @param services The services to resolve and pass to the constructor.
 */
export function inject<T extends ServiceClass<any>>(...dependencies: ServiceClass[]) {
  return (target: T) => {
    target.__dependencies = dependencies;
    return target;
  };
}
