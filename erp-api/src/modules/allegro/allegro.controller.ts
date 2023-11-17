import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AllegroService } from './allegro.service';
import { CreateAllegroDto } from './dto/create-allegro.dto';
import { UpdateAllegroDto } from './dto/update-allegro.dto';

@Controller('allegro')
export class AllegroController {
  constructor(private readonly allegroService: AllegroService) {}

  @Post()
  create(@Body() createAllegroDto: CreateAllegroDto) {
    return this.allegroService.create(createAllegroDto);
  }

  @Get()
  findAll() {
    return this.allegroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allegroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllegroDto: UpdateAllegroDto) {
    return this.allegroService.update(+id, updateAllegroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allegroService.remove(+id);
  }
}
