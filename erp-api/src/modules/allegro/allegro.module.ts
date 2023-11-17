import { Module } from '@nestjs/common';
import { AllegroService } from './allegro.service';
import { AllegroController } from './allegro.controller';

@Module({
  controllers: [AllegroController],
  providers: [AllegroService],
})
export class AllegroModule {}
