import { Test, TestingModule } from '@nestjs/testing';
import { FirmController } from './firm.controller';
import { FirmService } from './firm.service';

describe('FirmController', () => {
  let controller: FirmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirmController],
      providers: [FirmService],
    }).compile();

    controller = module.get<FirmController>(FirmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
