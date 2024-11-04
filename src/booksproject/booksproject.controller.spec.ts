import { Test, TestingModule } from '@nestjs/testing';
import { BooksprojectController } from './booksproject.controller';

describe('BooksprojectController', () => {
  let controller: BooksprojectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksprojectController],
    }).compile();

    controller = module.get<BooksprojectController>(BooksprojectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
