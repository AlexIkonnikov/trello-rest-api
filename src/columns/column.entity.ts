import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsDate, IsEmail, IsString } from "class-validator";
import { User } from "../users/user.entity";

@Entity('columns')
export class Columns {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    title: string
    
    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User
}