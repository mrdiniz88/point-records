import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from '../role/decorator/roles.decorator';
import { Role } from '../role/enum/role.enum';
import { RolesGuard } from '../role/guard/roles.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UserOutput } from '../users/dto/user.output';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    return await this.authService.login(context.user);
  }

  @Mutation(() => UserOutput)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async signup(@Args('signupInput') createUserInput: CreateUserInput) {
    return await this.authService.signup(createUserInput);
  }
}
