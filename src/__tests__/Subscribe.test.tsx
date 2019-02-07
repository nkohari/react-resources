import { shallow } from 'enzyme';
import * as React from 'react';
import { Subscribe } from '../Subscribe';
import { FooService } from './mocks';

describe('Subscribe', () => {
  it('resolves dependencies from the contextual Container', () => {
    const tree = shallow(
      <Subscribe to={[FooService]} fallback={<div>Loading...</div>}>
        {service => <div>{service.constructor.name}</div>}
      </Subscribe>
    );
    expect(tree.childAt(0).equals(<div>FooService</div>));
  });
});
