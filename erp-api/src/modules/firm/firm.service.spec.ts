import { Test, TestingModule } from '@nestjs/testing';
import { FirmService } from './firm.service';
import { Firm } from './entities/firm.entity';

describe('FirmService', () => {
  let service: FirmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirmService],
    }).compile();

    service = module.get<FirmService>(FirmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to add new firm', async () => {
    const result = await service.create({
      name: 'Test name',
      taxIdNumber: 123,
      addressId: '',
    });

    expect(result).toBeInstanceOf(Firm);
  });
});
