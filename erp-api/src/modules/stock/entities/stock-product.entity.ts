import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { FlatRateTax, VatRate } from 'src/types';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StockProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'varchar', length: 2 })
  vatRate: VatRate;

  @Column({ default: 0 })
  discount: number;

  @Column({ type: 'double precision' })
  flatRateTax: FlatRateTax;
}
