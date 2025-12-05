import {Book} from "./Book";

export class Member {
    id: number;
    name:string;
    borrowedBooks: Book[] = [];

    constructor(id:number, name: string){
      this.id = id;
      this.name = name;
    }

    borrowBook(book:Book){
      this.borrowedBooks.push(book);
    }
    returnBook(book:Book){
      this.borrowedBooks = this.borrowedBooks.filter(b => b.id !== book.id);
    }
    maxBorrowLimit: number = 3;

    canBorrow(): boolean {
      return this.borrowedBooks.length < this.maxBorrowLimit;
}

    getBorrowedBooks() {
      return this.borrowedBooks;
}

}

