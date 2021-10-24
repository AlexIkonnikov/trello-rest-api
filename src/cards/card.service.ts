import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICard } from 'src/interfaces/card.interface';
import { Repository } from 'typeorm';
import { UpdateCardDto } from './card.dto';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  createCard(card: ICard) {
    const newCard = this.cardRepository.create(card);
    this.cardRepository.save(newCard);
  }

  async getCardById(id: string) {
    return await this.cardRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async getUserCards(userId: string) {
    return await this.cardRepository.find({ where: { userId } });
  }

  updateCard(id: string, newCard: UpdateCardDto) {
    this.cardRepository.update(id, { ...newCard });
  }

  deleteById(id: string) {
    this.cardRepository.delete(id);
  }
}
