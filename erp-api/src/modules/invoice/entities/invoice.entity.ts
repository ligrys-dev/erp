import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from 'src/modules/client/entities/client.entity';
import { Firm } from 'src/modules/firm/entities/firm.entity';
import { InvoiceProduct } from './invoice-product.entity';

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceNumber: string;

  @Column()
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
  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct.invoice)
  @JoinColumn()
  products: InvoiceProduct[];
}
