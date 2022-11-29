import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TimeRegistered {
  @Field((type) => Date)
  timeRegistered: Date;
}
