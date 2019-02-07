import { inject } from '../../inject';
import { BarService } from './BarService';
import { FooService } from './FooService';

@inject(FooService, BarService)
export class ServiceWithDependencies {
  constructor(public foo: FooService, public bar: BarService) {}
}
