import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from './column.entity';
import { IColumn } from '../interfaces/column.interface';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns)
    private columnRepository: Repository<Columns>,
  ) {}

  createColumn(newColumn: IColumn) {
    const column = this.columnRepository.create(newColumn);
    this.columnRepository.save(column);
  }

  async getColumnById(id: string) {
    return await this.columnRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
  }

  async getAllColumn() {
    return await this.columnRepository.find({ relations: ['user'] });
  }

  async getUserColumns(id: string) {
    return await this.columnRepository.find({
      where: { userId: id },
    });
  }

  async deleteUserColumn(id: string) {
    this.columnRepository.delete(id);
  }

  async updateColumnTitle(id: string, title: string) {
    this.columnRepository.update(id, { title });
  }
}
