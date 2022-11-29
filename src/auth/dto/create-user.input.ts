import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../role/enum/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field((type) => Role)
  role: Role;
}
