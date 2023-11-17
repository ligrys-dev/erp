import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @Column()
  town: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telNumber: number;
}
