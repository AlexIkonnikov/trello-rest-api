import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CardService } from './card.service';

@Injectable()
export class UserHasCardGuard implements CanActivate {
  constructor(private cardService: CardService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const cardId = request.params.cardId;
    const userId = request.user.id;
    return this.cardService
      .getCardById(cardId)
      .then((card) => card.userId === userId);
  }
}
