import { Injectable } from '@nestjs/common';
import { CreateAllegroDto } from './dto/create-allegro.dto';
import { UpdateAllegroDto } from './dto/update-allegro.dto';

@Injectable()
export class AllegroService {
  create(createAllegroDto: CreateAllegroDto) {
    return 'This action adds a new allegro';
  }

  findAll() {
    return `This action returns all allegro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} allegro`;
  }

  update(id: number, updateAllegroDto: UpdateAllegroDto) {
    return `This action updates a #${id} allegro`;
  }

  remove(id: number) {
    return `This action removes a #${id} allegro`;
  }
}
