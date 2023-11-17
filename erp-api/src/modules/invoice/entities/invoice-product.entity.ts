import { StockProduct } from 'src/modules/stock/entities/stock-product.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => StockProduct)
  stockProduct: StockProduct;

  @ManyToOne(() => Invoice, (invoice) => invoice.products)
  invoice: Invoice;
}
