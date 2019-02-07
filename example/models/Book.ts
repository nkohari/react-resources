export class Book {
  title: string;
  author: string;
  isbn: string;
  rating: number;

  constructor(attrs: Partial<Book> = {}) {
    this.title = attrs.title;
    this.author = attrs.author;
    this.isbn = attrs.isbn;
    this.rating = attrs.rating;
  }
}
