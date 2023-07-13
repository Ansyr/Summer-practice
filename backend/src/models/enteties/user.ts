import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany, OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm"
import {Person} from "../utils/person";
import {Book} from "./book";
import {UserInfo} from "./user-info";


@Entity('user')
export class User extends Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    phone_number: string

    @ManyToMany(
        () => Book, (book) => book.users
    )
    books: Book[]

    @OneToOne(
        () => UserInfo
    )
    @JoinColumn({
            name: "user_info_id"
        }
    )
    user_info: UserInfo
}