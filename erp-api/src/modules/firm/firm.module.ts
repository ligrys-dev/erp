import { Module } from '@nestjs/common';
import { FirmService } from './firm.service';
import { FirmController } from './firm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Firm } from './entities/firm.entity';
import { Address } from 'src/common/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firm, Address])],
  controllers: [FirmController],
  providers: [FirmService],
  exports: [FirmService],
})
export class FirmModule {}
