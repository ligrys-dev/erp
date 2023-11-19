import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { assignProperties } from 'src/utils/assign-properties';
import { FirmService } from '../firm/firm.service';
import { ClientService } from '../client/client.service';
import { InvoiceProduct } from './entities/invoice-product.entity';
import { CreateInvoiceProductDto } from './dto/create-invoice-product.dto';
import { StockService } from '../stock/stock.service';

@Injectable()
export class InvoiceService {
  constructor(
    private firmService: FirmService,
    private clientService: ClientService,
    private stockService: StockService,
  ) {}

  async createInvoiceProduct(createInvoiceProductDto: CreateInvoiceProductDto) {
    const invoiceProduct = new InvoiceProduct();
    invoiceProduct.quantity = createInvoiceProductDto.quantity;
    invoiceProduct.invoice = await this.findOne(
      createInvoiceProductDto.invoiceId,
    );
    invoiceProduct.stockProduct = await this.stockService.findOne(
      createInvoiceProductDto.stockProductId,
    );
    return await invoiceProduct.save();
  }

  async findOneInoviceProduct(id: string) {
    return await InvoiceProduct.findOneByOrFail({ id });
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { firmId, clientId, products, ...invoiceData } = createInvoiceDto;
    const addedFirm = await this.firmService.findOne(firmId);
    const addedClient = await this.clientService.findOne(clientId);

    const invoice = new Invoice();
    assignProperties(invoice, invoiceData);
    invoice.firm = addedFirm;
    invoice.client = addedClient;
    const savedInvoice = await invoice.save();

    const invoiceProducts = await Promise.all(
      products.map(async (product) => {
        return await this.createInvoiceProduct({
          invoiceId: savedInvoice.id,
          stockProductId: product.id,
          quantity: product.quantity,
        });
      }),
    );

    return {
      invoiceData: savedInvoice,
      invoiceProducts,
    };
  }

  async findAll() {
    return await Invoice.find();
  }

  async findOne(id: string) {
    return await Invoice.findOneByOrFail({ id });
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return await Invoice.update({ id }, updateInvoiceDto);
  }

  async remove(id: string) {
    return await Invoice.remove(await this.findOne(id));
  }
}
