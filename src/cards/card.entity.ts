import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Columns } from '../columns/column.entity';
import { User } from '../users/user.entity';
import { IsDate, IsEmail, IsString } from 'class-validator';

const tableName = 'cards';

@Entity({
  name: tableName,
})
export class Card {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  title: string;

  @Column({ type: 'varchar' })
  @IsString()
  description: string;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'integer' })
  columnId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Columns, (columns) => columns.id, { onDelete: 'CASCADE' })
  column: Columns;
}
