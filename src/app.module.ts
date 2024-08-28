import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookApiModule } from './book-api/book-api.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BookApiModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
