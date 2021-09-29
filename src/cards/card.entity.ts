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

    @Column()
    userId: number

    @Column()
    columnId: number

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Columns, columns => columns.id, { onDelete: 'CASCADE' })
    column: Columns
}