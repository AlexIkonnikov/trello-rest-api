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
  ) {}

  async createUser(dto: CreateUserDto) {
    const candidate = this.usersRepository.create(dto);
    return await this.usersRepository.save(candidate);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async getUserPassword(email: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select('user.email', email)
      .addSelect('user.password')
      .getOne();
  }
}
