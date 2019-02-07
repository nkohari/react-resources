import * as React from 'react';
import { useServices } from '../../../src';
import { Rating } from 'example/components';
import { Book } from 'example/models';
import { Books } from 'example/services';
import classes from './BookRow.scss';

interface BookRowProps {
  book: Book;
}

export const BookRow = (props: BookRowProps) => {
  const [books] = useServices(Books);

  const changeBookRating = (rating: number) => {
    books.setRating(props.book.isbn, rating);
  };

  return (
    <div className={classes.bookRow}>
      <div className={classes.title}>{props.book.title}</div>
      <div className={classes.details}>
        <div className={classes.author}>{props.book.author}</div>
        <div className={classes.rating}>
          <Rating value={props.book.rating} onChange={changeBookRating} />
        </div>
      </div>
    </div>
  );
};
