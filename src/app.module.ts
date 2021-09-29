import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Columns } from './columns/column.entity';
import { Card } from './cards/card.entity';
import { Comment } from './comments/comment.entity';

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
