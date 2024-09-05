import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookApiModule } from './book-api/module/book-api.module';
import { AuthModule } from './auth/modules/auth.module';
<<<<<<< HEAD
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
=======
import { SharedModule } from './shared/shared.module';
import { ExtractTokenMiddleWare } from './shared/extractTokenMiddleware';

@Module({
  imports: [BookApiModule, AuthModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 8d21daf785765d557c095587d6501fd42655c956
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExtractTokenMiddleWare).exclude('/auth/*').forRoutes('*');
  }

}
