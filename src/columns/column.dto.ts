import { isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  title: string;

  userId: number;
}
