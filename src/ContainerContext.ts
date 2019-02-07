import * as React from 'react';
import { Context } from 'react';
import { Container } from './Container';

/**
 * A React context which holds a Container. This is used to supply
 * services to subtrees of the application.
 */
export const ContainerContext: Context<Container> = React.createContext(new Container());
