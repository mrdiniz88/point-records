import { Field, ObjectType } from '@nestjs/graphql';
import { TimeRegistered } from './time-registred.output';
import { UserOutput } from './user.output';

@ObjectType()
export class FindUserOutput extends UserOutput {
  @Field((type) => [TimeRegistered])
  registeredTimes: TimeRegistered[];
}
