import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Person} from "../utils/person";
import {Book} from "./book";

@Entity('author')
export class Author extends Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}