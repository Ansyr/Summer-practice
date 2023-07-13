import {
    BaseEntity, Column,
    Entity, OneToMany,

    PrimaryGeneratedColumn
} from "typeorm"
import {UserInfo} from "./user-info";


@Entity('location')
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    region:string

    @Column()
    city:string

    @Column()
    microdistrict:string

    @Column()
    house_num:number

    @Column()
    apartment:number

}