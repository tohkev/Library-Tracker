let myLibrary = [];

function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

function addBookToLibrary() {
  let title = prompt("Enter a book title:");
  let author = prompt("Enter the book's author:");
  let pages = prompt("Enter the number of pages in the book:");
  let newBook = Object.create(Book);
  newBook.title = title;
  newBook.author = author;
  newBook.genre = genre;
  myLibrary.push(newBook);
}
