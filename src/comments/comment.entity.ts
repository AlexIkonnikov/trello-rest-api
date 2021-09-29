import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsDate, IsEmail, IsString } from "class-validator";
import { Card } from "../cards/card.entity";
import { User } from "../users/user.entity";

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    text: string

    @Column()
    @IsDate()
    createdDate: Date

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Card, card => card.id, { onDelete: 'CASCADE' })
    card: Card
}