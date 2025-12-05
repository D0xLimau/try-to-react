import {Author} from "./Author";

export class Book{
    id: number;
    title: string;
    author: Author;
    isBorrowed: boolean = false;

   constructor (id: number, title: string, author: Author){ //initiate item
        this.id = id;
        this.title = title;
        this.author = author;
    }
    borrowBook(){
        this.isBorrowed = true;
    }
    returnBook(){
        this.isBorrowed = false;
    }
}

