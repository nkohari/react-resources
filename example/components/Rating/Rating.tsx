import * as React from 'react';
import classnames from 'classnames';
import classes from './Rating.scss';
import Star from 'example/assets/star.svg';

interface RatingProps {
  onChange: (value: number) => any;
  value: number;
}

export const Rating = (props: RatingProps) => {
  const handleRatingChanged = (index: number) => (event: React.MouseEvent) => {
    props.onChange(index + 1);
    event.stopPropagation();
  };

  const items = [];
  for (let index = 0; index < 5; index++) {
    const activeClasses = classnames(classes.star, {
      [classes.filled]: index < props.value,
    });
    const star = <Star key={index} className={activeClasses} onClick={handleRatingChanged(index)} />;
    items.push(star);
  }

  return <div className={classes.rating}>{items}</div>;
};
