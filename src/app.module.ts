import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/users/user.entity';
import { Columns } from './models/columns/column.entity';
import { Card } from './models/cards/card.entity';
import { Comment } from './models/comments/comment.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: 'root',
      database: 'Aleksandr',
      entities: [User, Columns, Card, Comment],
      synchronize: true,
    })
  ],
})
export class AppModule {}
