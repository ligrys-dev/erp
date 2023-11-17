import { Client } from 'src/modules/client/entities/client.entity';
import { Firm } from 'src/modules/firm/entities/firm.entity';
import { StockProduct } from 'src/modules/stock/entities/stock-product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceNumber: string;

  @CreateDateColumn()
  issueDate: Date;

  @Column()
  deliveryDate: Date;

  @Column()
  paymentDate: Date;

  @Column()
  isPaid: boolean;

  // Many invoices can belong to one firm
  @ManyToOne(() => Firm)
  @JoinColumn()
  firm: Firm;

  // Many invoices can belong to one client
  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  // One invoice can have many products
  @OneToMany(() => StockProduct, (stockProduct) => stockProduct.invoice)
  @JoinColumn()
  products: StockProduct[];
}
