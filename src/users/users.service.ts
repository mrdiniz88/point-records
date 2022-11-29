import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/auth/dto/create-user.input';
import { Repository } from 'typeorm';
import { UserOutput } from './dto/user.output';
import { RegisteredTime } from './entities/registered-time.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RegisteredTime)
    private readonly registeredTime: Repository<RegisteredTime>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserOutput> {
    const user = this.userRepository.create(createUserInput);

    await this.userRepository.save(user);

    const { password, ...result } = user;

    return result;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async registerPoint(user: User): Promise<RegisteredTime> {
    const registeredTime = this.registeredTime.create({
      user,
      timeRegistered: new Date(),
    });

    await this.registeredTime.save(registeredTime);

    return registeredTime;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        registeredTime: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
