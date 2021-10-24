import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CardModule } from 'src/cards/card.module';
import { ColumnsModule } from 'src/columns/column.module';
import { CommentModule } from 'src/comments/comment.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ColumnsModule,
    AuthModule,
    CardModule,
    CommentModule,
  ],
  exports: [UserService],
})
export class UserModule {}
