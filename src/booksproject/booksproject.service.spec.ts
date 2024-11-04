import { Test, TestingModule } from '@nestjs/testing';
import { BooksprojectService } from './booksproject.service';

describe('BooksprojectService', () => {
  let service: BooksprojectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksprojectService],
    }).compile();

    service = module.get<BooksprojectService>(BooksprojectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
