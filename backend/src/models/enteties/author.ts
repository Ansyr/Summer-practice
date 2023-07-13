import {Entity, PrimaryGeneratedColumn} from "typeorm"
import {Person} from "../utils/person";

@Entity('author')
export class Author extends Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}