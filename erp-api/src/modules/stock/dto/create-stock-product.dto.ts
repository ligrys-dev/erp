import { Invoice } from 'src/modules/invoice/entities/invoice.entity';
import { FlatRateTax, VatRate } from 'src/types';

export class CreateStockProductDto {
  name: string;
  price: number;
  vatRate: VatRate;
  discount: number;
  flatRateTax: FlatRateTax;
  // invoice: Invoice;
}
