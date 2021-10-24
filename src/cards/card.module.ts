import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comments/comment.module';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';

@Module({
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
  imports: [TypeOrmModule.forFeature([Card]), AuthModule, CommentModule],
})
export class CardModule {}
