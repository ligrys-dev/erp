import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from './entities/invoice-product.entity';
import { FirmService } from '../firm/firm.service';
import { ClientService } from '../client/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceProduct])],
  controllers: [InvoiceController],
  providers: [InvoiceService, FirmService, ClientService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
