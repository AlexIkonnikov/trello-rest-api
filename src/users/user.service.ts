import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(dto: CreateUserDto) {
        const candidate = this.usersRepository.create(dto);
        return this.usersRepository.save(candidate);
    }

    getAll() {
        return this.usersRepository.find();
    }
}