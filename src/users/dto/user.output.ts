import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../role/enum/role.enum';

@ObjectType()
export class UserOutput {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => Role)
  role: Role;
}
