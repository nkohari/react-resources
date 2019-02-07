import * as React from 'react';
import { Book } from 'example/models';
import { BookRow } from 'example/components';
import classes from './BookList.scss';

interface BookListProps {
  books: Book[];
}

export const BookList = (props: BookListProps) => (
  <ul className={classes.bookList}>
    {props.books.map(book => (
      <li key={book.isbn}>
        <BookRow book={book} />
      </li>
    ))}
  </ul>
);
