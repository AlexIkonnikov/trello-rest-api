import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { User } from '../users/user.entity';
import { Card } from 'src/cards/card.entity';
import { ApiProperty } from '@nestjs/swagger';

const tableName = 'columns';

@Entity({
  name: tableName,
})
export class Columns {
  static tableName = tableName;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  title: string;

  @Column({ type: 'integer' })
  userId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}
