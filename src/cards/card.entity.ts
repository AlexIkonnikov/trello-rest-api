import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Columns } from "../columns/column.entity";
import { User } from "../users/user.entity";
import { IsDate, IsEmail, IsString } from "class-validator";

@Entity('cards')
export class Card {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    title: string

    @Column()
    @IsString()
    description: string

    @ManyToOne(() => User, user => user.id)
    user: User

    @ManyToOne(() => Columns, columns => columns.id)
    column: Columns
}