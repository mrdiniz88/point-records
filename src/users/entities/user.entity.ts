import { Role } from '../../role/enum/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegisteredTime } from './registered-time.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role })
  role: Role;

  @OneToMany(() => RegisteredTime, (registeredTime) => registeredTime.user)
  registeredTime?: RegisteredTime[];
}
