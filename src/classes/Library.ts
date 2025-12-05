import { Book } from "./Book";
import { Member } from "./Member";

export class Library {
    books: Book[] = [];
    members: Member[] = [];

    //add new book
    addBook(book:Book){
        this.books.push(book);
    }

    // register new member
    registerMember(member:Member){
        this.members.push(member);
    }

    //borrow book
    borrowBook(bookId: number, memberId: number): string{
        const book = this.books.find(b=> b.id === bookId);
        const member = this.members.find(m=> m.id === memberId);

        if (!book) return "Book no found";
        if (!member) return "Member not found";
        if (book.isBorrowed) return "Book is already borrowed";
        if (!member.canBorrow()) {
            return `${member.name} has reached the borrow limit.`;
        }


        //process borrowing
        book.borrowBook();
        member.borrowBook(book);

        return `${member.name} borrowed ${book.title}`;
    }
    //return book
    returnBook(bookId:number,memberId: number):string{
        const book = this.books.find(b => b.id === bookId);
        const member = this.members.find(m => m.id === memberId);

        if (!book) return "Book no found";
        if (!member) return "Member not found";
        if (!book.isBorrowed) return "Book is already borrowed";

        //process returning
        book.returnBook();
        member.returnBook(book);

        return `${member.name} returned ${book.title}`;
    }

    listAvailableBooks(): Book[]{
        return this.books.filter(b => !b.isBorrowed);
    }

    // Search by title (case insensitive)
searchByTitle(title: string) {
  return this.books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
}

// Search by author name
searchByAuthor(authorName: string) {
  return this.books.filter(book =>
    book.author.name.toLowerCase().includes(authorName.toLowerCase())
  );
}

// Search by ID
searchById(id: number) {
  return this.books.find(book => book.id === id);
}

listAllBooks() {
  return this.books.sort((a, b) => a.title.localeCompare(b.title));
}

listBorrowedBooks() {
  return this.books.filter(b => b.isBorrowed);
}

listBooksByAuthor(authorName: string) {
  return this.books.filter(b => b.author.name === authorName);
}

listMemberBooks(memberId: number) {
  const member = this.members.find(m => m.id === memberId);
  if (!member) return "Member not found.";
  
  return member.getBorrowedBooks();
}
}



