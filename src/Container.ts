import { ServiceClass } from './types';

/**
 * A simple container for services.
 */
export class Container {
  private instances: Map<ServiceClass, unknown>;

  /**
   * @param parent An optional parent container from which instances should be inherited.
   */
  constructor(parent?: Container) {
    this.instances = new Map(parent ? parent.instances : null);
  }

  /**
   * Gets (or creates) the singleton instance of the specified service.
   * @param service The class of the service to resolve.
   */
  get<T>(service: ServiceClass<T>): T {
    let instance = this.instances.get(service) as T;

    if (!instance) {
      const deps = service.__dependencies;
      const args = deps ? deps.map(dependency => this.get(dependency)) : [];
      instance = new service(...args);
      this.set(service, instance);
    }

    return instance;
  }

  /**
   * Sets the singleton instance of the specified service. All subsequent calls to
   * Container.get() will then return this instance.
   * @param service The class of the service.
   * @param instance The instance to associate with the service.
   */
  set<T>(service: ServiceClass<T>, instance: T) {
    this.instances.set(service, instance);
  }
}
