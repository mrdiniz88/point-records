import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { password, ...result } = user;

    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        sub: user.id,
        role: user.role,
        name: user.name,
      }),
      user: result,
    };
  }

  async signup(createUserInput: CreateUserInput) {
    const user = await this.usersService.findOne(createUserInput.email);

    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return await this.usersService.create({ ...createUserInput, password });
  }
}
