import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/enum/role.enum';
import { RegisteredTime } from './entities/registered-time.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOneBy: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn(),
  findOne: jest.fn((entity) => entity),
}));

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepositoryMock: MockType<Repository<User>>;
  let registeredTimeRepositoryMock: MockType<Repository<RegisteredTime>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(RegisteredTime),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepositoryMock = module.get(getRepositoryToken(User));
    registeredTimeRepositoryMock = module.get(
      getRepositoryToken(RegisteredTime),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('shoud find a user by email', () => {
    const user = {
      id: 1,
      name: 'john',
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
    };

    userRepositoryMock.findOneBy.mockReturnValue(user);

    expect(usersService.findOne('john@email.com')).resolves.toEqual(user);
  });

  it('should find all users', () => {
    const user1 = {
      id: 1,
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
    };

    const user2 = {
      id: 1,
      email: 'doe@email.com',
      password: 'pass',
      role: Role.Collaborator,
    };

    userRepositoryMock.find.mockReturnValue([user1, user2]);

    expect(usersService.findAll()).resolves.toEqual([user1, user2]);
  });

  it('shoud create a user', async () => {
    const user = {
      name: 'john',
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
    };

    userRepositoryMock.create.mockReturnValue({ ...user, id: '123' });

    const userCreated = await usersService.create(user);

    expect(userCreated.id).toBeDefined();
    expect(userCreated.email).toBe(user.email);
    expect(userCreated.role).toBe(user.role);
  });

  it('should register point', () => {
    const user = {
      id: '1',
      name: 'john',
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
    };

    const output = { user, registeredTime: new Date() };

    registeredTimeRepositoryMock.create.mockReturnValue(output);

    expect(usersService.registerPoint(user)).resolves.toEqual(output);
  });

  it('should find user', () => {
    const user = {
      id: '1',
      name: 'john',
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
      registeredTimes: [
        {
          timeRegistered: new Date(),
        },
      ],
    };

    userRepositoryMock.findOne.mockReturnValue(user);

    expect(usersService.findUserById('1')).resolves.toEqual(user);
  });

  it('should user not found', () => {
    userRepositoryMock.findOne.mockReturnValue(undefined);

    expect(usersService.findUserById('1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
