import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from 'typeorm';
import { UserCredential } from './userCredential';

export enum Gender {
  Female = 0,
  Male = 1,
  Other = 2
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', name: 'fist_name'})
  firstName: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'text', name: 'img_name' })
  imgName: string;

  @OneToOne(type => UserCredential, userCredential => userCredential.user)
  userCredential: UserCredential;
}
