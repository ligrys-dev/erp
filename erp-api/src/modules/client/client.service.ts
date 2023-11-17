import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { assignProperties } from 'src/utils/assign-properties';

@Injectable()
export class ClientService {
  async create(createClientDto: CreateClientDto) {
    const client = new Client();
    assignProperties(client, createClientDto);
    return await client.save();
  }

  async findAll() {
    return await Client.find();
  }

  async findOne(id: string) {
    return await Client.findOneByOrFail({ id });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await Client.update({ id }, updateClientDto);
  }

  async remove(id: string) {
    return await Client.remove(await this.findOne(id));
  }
}
