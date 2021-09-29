import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Card } from "../cards/card.entity";
import { User } from "../users/user.entity";

@Entity('comments')
export class Comment{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    createdDate: string

    @ManyToOne(() => User, user => user.id)
    user: User

    @ManyToOne(() => Card, card => card.id)
    card: Card
}