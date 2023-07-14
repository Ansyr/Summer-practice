     import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany, ManyToOne, OneToMany, OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm"
import {Person} from "../utils/person";
import {Book} from "./book";
import {Location} from "./location";


@Entity('user_info')
export class UserInfo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    birth_date: Date;

    @Column()
    degree_education:string

    @OneToOne(
        () => Location, (location) => location
    )
    @JoinColumn({
        name:"location_id"
    })
    location:Location

}