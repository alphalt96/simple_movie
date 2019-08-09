import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'user_credentials' })
export class UserCredential extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToOne(type => User, user => user.userCredential)
  @JoinColumn()
  user: User;
}
