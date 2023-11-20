import { FlatRateTax, VatRate } from 'src/types';

export class CreateStockProductDto {
  name: string;
  price: number;
  vatRate: VatRate;
  flatRateTax: FlatRateTax;
  discount?: number;
}
