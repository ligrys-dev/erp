import { Test, TestingModule } from '@nestjs/testing';
import { AllegroAuthController } from './allegro-auth.controller';

describe('AllegroAuthController', () => {
  let controller: AllegroAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllegroAuthController],
    }).compile();

    controller = module.get<AllegroAuthController>(AllegroAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
