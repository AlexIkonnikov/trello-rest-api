import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IComment } from 'src/interfaces/comment.interface';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  createComment(comment: IComment) {
    const newComment = this.commentRepository.create(comment);
    this.commentRepository.save(newComment);
  }

  updateComment(id: string, text: string) {
    this.commentRepository.update(id, { text });
  }

  deleteComment(id: string) {
    this.commentRepository.delete(id);
  }

  async getCommentById(id: string) {
    return await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async getUserComment(userId: string) {
    return await this.commentRepository.find({ where: { userId } });
  }
}
