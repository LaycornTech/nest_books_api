import { Module } from '@nestjs/common';
import { BookApiService } from './book-api.service';
import { BookApiController } from './book-api.controller';

@Module({
  providers: [BookApiService],
  controllers: [BookApiController]
})
export class BookApiModule {}
