import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisteredTime } from './entities/registered-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RegisteredTime])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
