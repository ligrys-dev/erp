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

  async findAll() {
    return await Firm.find();
  }

  async findOne(id: string) {
    return await Firm.findOneByOrFail({ id });
  }

  async update(id: string, updateFirmDto: UpdateFirmDto) {
    return await Firm.update({ id }, updateFirmDto);
  }

  async remove(id: string) {
    return await Firm.remove(await this.findOne(id));
  }
}
