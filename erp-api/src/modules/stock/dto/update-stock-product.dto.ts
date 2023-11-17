import { PartialType } from '@nestjs/mapped-types';
import { CreateStockProductDto } from './create-stock-product.dto';

export class UpdateStockProductDto extends PartialType(CreateStockProductDto) {}
