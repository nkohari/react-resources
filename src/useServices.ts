import { useContext, useEffect, useState } from 'react';
import { ContainerContext } from './ContainerContext';
import { Observable } from './Observable';
import { DependencyList, InstanceArray } from './types';

export function useServices<D extends DependencyList>(...dependencies: D): InstanceArray<D> {
  const container = useContext(ContainerContext);
  const instances = dependencies.map(dependency => container.get(dependency)) as InstanceArray<D>;

  const [, setMarker] = useState({});
  const handleUpdate = () => setMarker({});

  useEffect(() => {
    for (const instance of instances) {
      if (instance instanceof Observable) instance.subscribe(handleUpdate);
    }
    return () => {
      for (const instance of instances) {
        if (instance instanceof Observable) instance.unsubscribe(handleUpdate);
      }
    };
  });

  return instances;
}
