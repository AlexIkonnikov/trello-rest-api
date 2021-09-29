import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsString } from "class-validator";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    @IsString()
    name: string

    @Column()
    password: string
}