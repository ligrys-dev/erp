import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateStockProductDto } from './dto/create-stock-product.dto';
import { UpdateStockProductDto } from './dto/update-stock-product.dto';
import { StockProduct } from './entities/stock-product.entity';
import { assignProperties } from 'src/utils/assign-properties';
import { FlatRateTax, VatRate } from 'src/types';

@Injectable()
export class StockService {
  async create(createStockProductDto: CreateStockProductDto) {
    if (!Object.values(VatRate).includes(createStockProductDto.vatRate)) {
      throw new UnprocessableEntityException(
        `Invalid VatRate value: ${createStockProductDto.vatRate}`,
      );
    }

    if (
      !Object.values(FlatRateTax).includes(createStockProductDto.flatRateTax)
    ) {
      throw new UnprocessableEntityException(
        `Invalid FlatRateTax value: ${createStockProductDto.flatRateTax}`,
      );
    }

    const stockProduct = new StockProduct();
    assignProperties(stockProduct, createStockProductDto);

    const { id } = await stockProduct.save();
    return { id };
  }

  async findAll() {
    return await StockProduct.find();
  }

  async findOne(id: string) {
    return await StockProduct.findOneByOrFail({ id });
  }

  async update(id: string, updateStockDto: UpdateStockProductDto) {
    return await StockProduct.update({ id }, updateStockDto);
  }

  async remove(id: string) {
    return await StockProduct.remove(await this.findOne(id));
  }
}
