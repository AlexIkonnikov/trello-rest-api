import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ColumnService } from './column.service';

@Injectable()
export class UserHasColumnGuard implements CanActivate {
  constructor(private columnService: ColumnService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const columnId = request.params.columnId;
    const userId = request.user.id;
    return this.columnService
      .getColumnById(columnId)
      .then((column) => column.userId === userId);
  }
}
