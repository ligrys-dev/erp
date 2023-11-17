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
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @ManyToOne(() => Address) // One client has one address
  // @JoinColumn()
  // address: Address;
}
