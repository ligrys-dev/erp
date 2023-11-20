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

  @Column({ type: 'numeric' })
  taxIdNumber: number;

  @Column({ type: 'varchar', length: 26, nullable: true })
  bankAccountNumber: string;

  //FIXME
  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address;
}
