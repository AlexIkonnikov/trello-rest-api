import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() userDto: CreateUserDto) {
        return await this.userService.createUser(userDto);
    }

    @Get()
    async getAll() {
        return await this.userService.getAll();
    }
}