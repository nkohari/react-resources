import * as React from 'react';
import { useState } from 'react';
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
  const [isExpanded, setExpanded] = useState(false);

  const changeBookRating = (rating: number) => {
    books.setRating(props.book.isbn, rating);
  };

  let details;
  if (isExpanded) {
    details = (
      <div className={classes.details}>
        <div className={classes.isbn}>
          <strong>ISBN</strong> {props.book.isbn}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.bookRow} onClick={() => setExpanded(!isExpanded)}>
      <div className={classes.content}>
        <div className={classes.title}>{props.book.title}</div>
        <div className={classes.authorAndRating}>
          <div className={classes.author}>{props.book.author}</div>
          <div className={classes.rating}>
            <Rating value={props.book.rating} onChange={changeBookRating} />
          </div>
        </div>
      </div>
      {details}
    </div>
  );
};
