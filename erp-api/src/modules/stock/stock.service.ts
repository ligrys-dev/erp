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

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockProductDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
