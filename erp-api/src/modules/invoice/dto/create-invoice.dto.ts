import { Client } from 'src/modules/client/entities/client.entity';
import { Firm } from 'src/modules/firm/entities/firm.entity';
import { StockProduct } from 'src/modules/stock/entities/stock-product.entity';

export class CreateInvoiceDto {
  invoiceNumber: string;
  issueDate: Date;
  deliveryDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  // firm: Firm;
  // client: Client;
  // products: StockProduct[];
}
