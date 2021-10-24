import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommentService } from 'src/comments/comment.service';

@Injectable()
export class UserHasCommentGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const commentId = request.params.commentId;
    const userId = request.user.id;
    return this.commentService
      .getCommentById(commentId)
      .then((comment) => comment.userId === userId);
  }
}
