import { Test, TestingModule } from '@nestjs/testing';
import { AllegroController } from './allegro.controller';
import { AllegroService } from './allegro.service';

describe('AllegroController', () => {
  let controller: AllegroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllegroController],
      providers: [AllegroService],
    }).compile();

    controller = module.get<AllegroController>(AllegroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
