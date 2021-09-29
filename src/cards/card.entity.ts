import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Columns } from "../columns/column.entity";
import { User } from "../users/user.entity";

@Entity('cards')
export class Card {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User, user => user.id)
    user: User

    @ManyToOne(() => Columns, columns => columns.id)
    column: Columns
}