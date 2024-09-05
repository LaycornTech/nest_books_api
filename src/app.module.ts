import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookApiModule } from './book-api/module/book-api.module';
import { AuthModule } from './auth/modules/auth.module';
import { UsersModule } from './users/modules/users.module';
import { UsersService } from './users/service/users.service';
import { UsersController } from './users/controllers/users.controller';
import { DemoModule } from './demo/module/demo.module';
import { DemoService } from './demo/service/demo.service';
import { DemoController } from './demo/controller/demo.controller';

@Module({
  imports: [BookApiModule, AuthModule, UsersModule, DemoModule],
  controllers: [AppController, UsersController, DemoController],
  providers: [AppService, UsersService, DemoService],
})
export class AppModule {}
