import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { CreateUserDto, LoginUserDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const newUser = await this.userService.getUserByEmail(userDto.email);
    if (newUser) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const user = await this.userService.createUser({ ...userDto });
    return { ...user, token: this.generateToken(user) };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    return { ...user, token: this.generateToken(user) };
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (user && isMatch) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect username or password',
    });
  }
}
