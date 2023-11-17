import { Address } from 'src/common/entities/address.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Firm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  taxIdNumber: number;

  @Column({ nullable: true })
  bankAccountNumber: number;

  //FIXME
  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address;
}
