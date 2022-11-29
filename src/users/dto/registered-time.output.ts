import { ObjectType, Field } from '@nestjs/graphql';
import { TimeRegistered } from './time-registred.output';
import { UserOutput } from './user.output';

@ObjectType()
export class RegisteredTimeOutput extends TimeRegistered {
  @Field(() => UserOutput)
  user?: UserOutput;
}
