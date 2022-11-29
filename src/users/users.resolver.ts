import { Context, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../role/guard/roles.guard';
import { Roles } from '../role/decorator/roles.decorator';
import { Role } from '../role/enum/role.enum';
import { UserOutput } from './dto/user.output';
import { RegisteredTimeOutput } from './dto/registered-time.output';
import { PubSub } from 'graphql-subscriptions';
import { FindUserOutput } from './dto/find-user.output';

const pubSub = new PubSub();

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserOutput], { name: 'users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => RegisteredTimeOutput, { name: 'registerPoint' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Collaborator)
  async registerPoint(@Context() context: any) {
    const registered = await this.usersService.registerPoint(context.req.user);

    pubSub.publish('registers', { registers: registered });

    return registered;
  }

  @Subscription(() => RegisteredTimeOutput)
  registers() {
    return pubSub.asyncIterator('registers');
  }

  @Query(() => FindUserOutput, { name: 'findUser' })
  @UseGuards(JwtAuthGuard)
  async findUser(@Context() context): Promise<FindUserOutput> {
    const user = await this.usersService.findUserById(context.req.user.id);

    return { ...user, registeredTimes: user.registeredTime };
  }
}
