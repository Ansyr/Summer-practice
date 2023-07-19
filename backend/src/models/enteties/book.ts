import {
    BaseEntity,
    Column, CreateDateColumn,
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

    @Column({nullable: true})
    added_count: number

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

    @CreateDateColumn()
    added_date: Date;

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


@Entity()
export class UserBook {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    added_date: Date;

    @Column()
    user_id: number;

    @Column()
    book_id: number;
}