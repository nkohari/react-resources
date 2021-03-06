import * as React from 'react';
import { Container } from './Container';
import { ContainerContext } from './ContainerContext';
import { ServiceClass } from './types';

interface ProviderProps {
  /**
   * Children to render.
   */
  children: React.ReactNode;
  /**
   * Allows passing external instances into the provider's scope instead
   * of resolving them via the Container. Mostly useful for testing.
   */
  inject?: object[];
}

/**
 * Creates a scope in which services will be created. Can be used to isolate
 * services for a specific subtree, or inject predetermined values for services.
 */
export const Provider = (props: ProviderProps) => (
  <ContainerContext.Consumer>
    {parentContainer => {
      const container = new Container(parentContainer);
      if (props.inject) {
        props.inject.forEach(instance => {
          const service = instance.constructor as ServiceClass;
          container.set(service, instance);
        });
      }
      return <ContainerContext.Provider value={container}>{props.children}</ContainerContext.Provider>;
    }}
  </ContainerContext.Consumer>
);
