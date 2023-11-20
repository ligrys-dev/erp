import { Injectable } from '@nestjs/common';
import { CreateFirmDto } from './dto/create-firm.dto';
import { UpdateFirmDto } from './dto/update-firm.dto';
import { Firm } from './entities/firm.entity';
import { assignProperties } from 'src/utils/assign-properties';
import { Address } from 'src/common/entities/address.entity';

@Injectable()
export class FirmService {
  async create(createFirmDto: CreateFirmDto) {
    const { addressId, ...firmData } = createFirmDto;
    const firm = new Firm();
    assignProperties(firm, firmData);
    // TODO implement adding new address
    firm.address = await Address.findOneByOrFail({ id: addressId });
    const { id } = await firm.save();
    return { id };
  }

  async findAll() {
    return await Firm.find();
  }

  async findOne(id: string) {
    return await Firm.findOneOrFail({ where: { id }, relations: ['address'] });
  }

  async update(id: string, updateFirmDto: UpdateFirmDto) {
    return await Firm.update({ id }, updateFirmDto);
  }

  async remove(id: string) {
    return await Firm.remove(await this.findOne(id));
  }
}
