import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm"



@Entity('sale')
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    discount: number

    @Column({
        type:"numeric"
    })
    price: number

    @Column()
    amount:number
}