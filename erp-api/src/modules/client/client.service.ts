import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { assignProperties } from 'src/utils/assign-properties';
import { Address } from 'src/common/entities/address.entity';

@Injectable()
export class ClientService {
  async create(createClientDto: CreateClientDto) {
    const { addressId, ...clientData } = createClientDto;
    const client = new Client();
    assignProperties(client, clientData);
    client.address = await Address.findOneByOrFail({ id: addressId });
    const { id } = await client.save();
    return { id };
  }

  async findAll() {
    return await Client.find();
  }

  async findOne(id: string) {
    return await Client.findOneOrFail({
      where: { id },
      relations: ['address'],
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await Client.update({ id }, updateClientDto);
  }

  async remove(id: string) {
    return await Client.remove(await this.findOne(id));
  }
}
