import { inject, Resource } from '../../src';
import { Book } from 'example/models';
import { simulateFetch } from 'example/util/simulateFetch';
import { Configuration } from './Configuration';

const BOOK_DATA = [
  { title: 'Neuromancer', author: 'William Gibson', isbn: '9780586066454', rating: 5 },
  { title: 'Do Androids Dream of Electric Sheep?', author: 'Philip K. Dick', isbn: '9780203100592', rating: 4 },
  { title: 'Snow Crash', author: 'Neal Stephenson', isbn: '9780140232929', rating: 1 },
];

@inject(Configuration)
export class Books extends Resource {
  constructor(public configuration: Configuration) {
    super();
  }

  get(isbn: string): Book {
    return this.resolve(() => {
      const datum = BOOK_DATA.find(datum => datum.isbn === isbn);
      if (!datum) {
        throw new Error(`No book with the isbn ${isbn} was found`);
      }
      return simulateFetch(new Book(datum));
    }, isbn);
  }

  getAll(): Book[] {
    return this.resolve(() => {
      const books = BOOK_DATA.map(datum => new Book(datum));
      return simulateFetch(books);
    });
  }

  setRating(isbn: string, rating: number) {
    const datum = BOOK_DATA.find(datum => datum.isbn === isbn);
    if (!datum) {
      throw new Error(`No book with the isbn ${isbn} was found`);
    }
    datum.rating = rating;
    this.clear();
  }
}
