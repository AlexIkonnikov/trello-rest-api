import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsDate, IsEmail, IsString } from "class-validator";
import { User } from "../users/user.entity";

const tableName = 'columns';

@Entity({
    name: tableName
})
export class Columns {

    static tableName = tableName;

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    @IsString()
    title: string

    @Column({ type: 'integer' })
    userId: number

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    user: User
}