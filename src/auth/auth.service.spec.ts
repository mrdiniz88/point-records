import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../role/enum/role.enum';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let user: any;
  let usersService: UsersService;
  let userOutput: any;

  beforeEach(async () => {
    const pass = await bcrypt.hash('pass', 10);

    user = {
      id: 1,
      name: 'john',
      email: 'john@email.com',
      password: pass,
      role: Role.Admin,
    };

    const { password, ...result } = user;

    userOutput = result;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockReturnValue(Promise.resolve(user)),
            create: jest.fn().mockReturnValue(Promise.resolve(userOutput)),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate a user', () => {
    expect(authService.validateUser(user.email, 'pass')).resolves.toEqual(
      userOutput,
    );
  });

  it('should not validate a user', () => {
    expect(authService.validateUser(user.email, 'passo')).resolves.toBe(null);
  });

  it('should user not exists', () => {
    jest.spyOn(usersService, 'findOne').mockReturnValue(undefined);

    expect(authService.validateUser('Email', 'pass')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('should login', async () => {
    const login = await authService.login(user);

    expect(login.accessToken).toBeDefined();
    expect(login.user).toEqual(userOutput);
  });

  it('should signup', async () => {
    const user = {
      name: 'john',
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
    };

    jest.spyOn(usersService, 'findOne').mockReturnValue(undefined);

    const userCreated = await authService.signup(user);

    expect(userCreated).toEqual(userOutput);
  });

  it('should not signup', () => {
    const user = {
      name: 'john',
      email: 'john@email.com',
      password: 'pass',
      role: Role.Admin,
    };

    expect(authService.signup(user)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
