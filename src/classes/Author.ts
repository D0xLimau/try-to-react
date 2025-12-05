import { Book } from "./Book";

export class Author{
    name: string
    books: Book[] = [];

    constructor(name:string){
        this.name = name;
    }
}
