import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { assignProperties } from 'src/utils/assign-properties';
import { FirmService } from '../firm/firm.service';
import { ClientService } from '../client/client.service';
import { InvoiceProduct } from './entities/invoice-product.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private firmService: FirmService,
    private clientService: ClientService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    //FIXME check if working
    const { firm, client, products, ...invoiceData } = createInvoiceDto;
    const addedFirm = await this.firmService.findOne(firm.id);
    const addedClient = await this.clientService.findOne(firm.id);

    const invoice = new Invoice();
    assignProperties(invoice, invoiceData);
    invoice.firm = addedFirm;
    invoice.client = addedClient;

    const invoiceProducts = await products.map(async (product) => {
      const prod = new InvoiceProduct();
      assignProperties(prod, product);
      return await prod.save();
    });

    return {
      invoiceData: await invoice.save(),
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
