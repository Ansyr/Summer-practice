import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    sur_name: string

}