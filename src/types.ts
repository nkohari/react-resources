export interface Fragment<T = unknown> {
  status: 'loading' | 'ready' | 'error';
  promise: Promise<T>;
  value?: T;
  error?: Error;
}

export interface ServiceClass<T = unknown> {
  __dependencies?: ServiceClass[];
  new (...args: any[]): T;
}

export type DependencyList = [ServiceClass, ...ServiceClass[]];
export type InstanceType<TConstructor> = TConstructor extends new (...args: any[]) => infer T ? T : never;
export type InstanceArray<T extends DependencyList> = { [P in keyof T]: InstanceType<T[P]> };
