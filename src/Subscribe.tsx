import * as React from 'react';
import { Suspense } from 'react';
import { DependencyList, InstanceArray } from './types';
import { useServices } from './useServices';

interface SubscribeProps<TDependencies extends DependencyList> {
  /**
   * A function which accepts instances of services, and renders the subtree.
   */
  children: (...services: InstanceArray<TDependencies>) => React.ReactNode;
  /**
   * A React tree to display while data is being loaded from services.
   */
  fallback: React.ReactNode;
  /**
   * A set of services which are required by the children.
   */
  to: TDependencies;
}

const SubscribeContent = <TDependencies extends DependencyList>(props: SubscribeProps<TDependencies>) => {
  const dependencies = props.to;
  const services = useServices(...dependencies);
  const renderer = props.children;
  return renderer.apply(null, services);
};

/**
 * Resolves instances of services, and provides means to show a loading message
 * while necessary data is still being loaded from those services.
 */
export const Subscribe = <TDependencies extends DependencyList>(props: SubscribeProps<TDependencies>) => (
  <Suspense fallback={props.fallback}>
    <SubscribeContent {...props} />
  </Suspense>
);
