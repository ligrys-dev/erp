import { Injectable } from '@nestjs/common';
import { CreateStockProductDto } from './dto/create-stock-product.dto';
import { UpdateStockProductDto } from './dto/update-stock-product.dto';
import { StockProduct } from './entities/stock-product.entity';
import { assignProperties } from 'src/utils/assign-properties';

@Injectable()
export class StockService {
  async create(createStockDto: CreateStockProductDto) {
    const stockProduct = new StockProduct();
    assignProperties(stockProduct, createStockDto);
    return await stockProduct.save();
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
