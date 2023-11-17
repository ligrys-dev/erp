import { Injectable } from '@nestjs/common';
import { CreateFirmDto } from './dto/create-firm.dto';
import { UpdateFirmDto } from './dto/update-firm.dto';
import { Firm } from './entities/firm.entity';
import { assignProperties } from 'src/utils/assign-properties';

@Injectable()
export class FirmService {
  async create(createFirmDto: CreateFirmDto) {
    const firm = new Firm();
    assignProperties(firm, createFirmDto);
    return await firm.save();
  }

  findAll() {
    return `This action returns all firm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firm`;
  }

  update(id: number, updateFirmDto: UpdateFirmDto) {
    return `This action updates a #${id} firm`;
  }

  remove(id: number) {
    return `This action removes a #${id} firm`;
  }
}
