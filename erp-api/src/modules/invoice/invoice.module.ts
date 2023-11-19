import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProduct } from './entities/invoice-product.entity';
import { StockModule } from '../stock/stock.module';
import { FirmModule } from '../firm/firm.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    forwardRef(() => StockModule),
    forwardRef(() => FirmModule),
    forwardRef(() => ClientModule),
    TypeOrmModule.forFeature([Invoice, InvoiceProduct]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
