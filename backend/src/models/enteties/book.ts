import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany, ManyToOne, OneToOne, PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm"
import {User} from './user'
import {Author} from "./author";
import {Sale} from "./sale";
@Entity('book')
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    book_name: string

    @Column()
    publish_year:number

    @ManyToMany(() => User, (user) => user.books)
    @JoinTable({
        name: 'books_users',
        joinColumn:{
            name:'book',
            referencedColumnName:'id'
        },
        inverseJoinColumn: {
            name: 'user',
            referencedColumnName: "id"
        }
    })
    users:User[]

    @ManyToOne(() => Author, (author) => author.books)
    @JoinColumn({ name: "author_id" })
    author: Author;

    @OneToOne(
        () => Sale
    )
    @JoinColumn({
        name: "sale_id"
    })
    sale:Sale
}