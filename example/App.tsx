import * as React from 'react';
import { Subscribe } from '../src';
import { BookList } from 'example/components';
import { Books } from 'example/services';
import './App.scss';

export const App = () => (
  <Subscribe to={[Books]} fallback={<div>Loading...</div>}>
    {books => <BookList books={books.getAll()} />}
  </Subscribe>
);
