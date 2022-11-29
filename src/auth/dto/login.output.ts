import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from '../../users/dto/user.output';

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string;

  @Field(() => UserOutput)
  user: UserOutput;
}
