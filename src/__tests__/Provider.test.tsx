import { mount } from 'enzyme';
import * as React from 'react';
import { Container } from '../Container';
import { ContainerContext } from '../ContainerContext';
import { Provider } from '../Provider';
import { FooService } from './mocks';

describe('Provider', () => {
  it('adds a Container to the React context', () => {
    let contextualContainer;
    mount(
      <Provider>
        <ContainerContext.Consumer>
          {container => {
            contextualContainer = container;
            return <div />;
          }}
        </ContainerContext.Consumer>
      </Provider>
    );
    expect(contextualContainer).toBeInstanceOf(Container);
  });

  it('allows service instances to be injected', () => {
    const instance = new FooService();
    let injectedInstance;
    mount(
      <Provider inject={[instance]}>
        <ContainerContext.Consumer>
          {container => {
            injectedInstance = container.get(FooService);
            return <div />;
          }}
        </ContainerContext.Consumer>
      </Provider>
    );
    expect(injectedInstance).toBe(instance);
  });
});
