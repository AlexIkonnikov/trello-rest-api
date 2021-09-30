import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsDate, IsEmail, IsString } from "class-validator";
import { Card } from "../cards/card.entity";
import { User } from "../users/user.entity";

const tableName = 'comments';

@Entity({
    name: tableName
})
export class Comment {

    static tableName = tableName;

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    @IsString()
    text: string

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt: Date

    @Column({ type: 'integer' })
    userId: number

    @Column({ type: 'integer' })
    cardId: number

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Card, card => card.id, { onDelete: 'CASCADE' })
    card: Card
}