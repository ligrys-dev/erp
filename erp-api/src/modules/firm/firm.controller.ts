import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirmService } from './firm.service';
import { CreateFirmDto } from './dto/create-firm.dto';
import { UpdateFirmDto } from './dto/update-firm.dto';

@Controller('firm')
export class FirmController {
  constructor(private readonly firmService: FirmService) {}

  @Post()
  create(@Body() createFirmDto: CreateFirmDto) {
    return this.firmService.create(createFirmDto);
  }

  @Get()
  findAll() {
    return this.firmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.firmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFirmDto: UpdateFirmDto) {
    return this.firmService.update(+id, updateFirmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.firmService.remove(+id);
  }
}
