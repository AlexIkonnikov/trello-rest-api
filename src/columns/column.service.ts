import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { CreateColumnDto } from "./column.dto";
import { Columns } from "./column.entity";

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(Columns)
        private columnRepository: Repository<Columns>
    ) { }

    createColumn(dto: CreateColumnDto) {
        const column = this.columnRepository.create(dto);
        this.columnRepository.save(column);
    };

    async getAllColumn() {
        return await this.columnRepository.find({ relations: ['user'] });
    }

    async getUserColumns(id: string) {
        return await this.columnRepository.find({ where: { userId: id } });
    }

    async deleteUserColumn(id: string) {
        this.columnRepository.delete(id);
    }

    async updateColumnTitle(id: string, title: string) {
        this.columnRepository.update(id, { title });
    }
}