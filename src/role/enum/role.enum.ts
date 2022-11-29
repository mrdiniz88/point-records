import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  Collaborator = 'collaborator',
  Admin = 'admin',
}

registerEnumType(Role, {
  name: 'Role',
});
