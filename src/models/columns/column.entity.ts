import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity('columns')
export class Columns {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
    
    @ManyToOne(() => User, user => user.id)
    user: User
}