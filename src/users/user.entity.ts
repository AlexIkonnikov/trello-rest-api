import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { IsEmail, IsString } from "class-validator";
import * as bcrypt from 'bcrypt';

const tableName = 'users';

@Entity({
    name: tableName
})
export class User {
    static tableName = tableName;
    
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

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}