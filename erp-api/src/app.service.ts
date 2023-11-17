import { Injectable } from '@nestjs/common';
import { FirmService } from './modules/firm/firm.service';
import { ClientService } from './modules/client/client.service';
import { InvoiceService } from './modules/invoice/invoice.service';
import { StockService } from './modules/stock/stock.service';
import { FlatRateTax, VatRate } from './types';

@Injectable()
export class AppService {
  constructor(
    private firmService: FirmService,
    private clientService: ClientService,
    private invoiceService: InvoiceService,
    private stockService: StockService,
  ) {}

  async test() {
    const obj = {
      firm: await this.firmService.create({ name: 'test', taxIdNumber: 123 }),
      client: await this.clientService.create({ name: 'testowy' }),
      stock: await this.stockService.create({
        name: 'testowy obj',
        price: 12.5,
        vatRate: VatRate.VAT_ZW,
        discount: 0,
        flatRateTax: FlatRateTax.RATE_3,
      }),
      invoice: await this.invoiceService.create({
        invoiceNumber: '123/ds',
        deliveryDate: new Date(),
        issueDate: new Date(Date.now()),
        paymentDate: new Date(Date.now() + 100000000000000),
        isPaid: false,
      }),
    };
    return obj;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
