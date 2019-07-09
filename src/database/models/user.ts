import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Gender {
  Female = 0,
  Male = 1,
  Other = 2
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;
}
