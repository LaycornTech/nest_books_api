import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BookApiModule } from './book-api/module/book-api.module';
// import { AuthModule } from './auth/modules/auth.module';
import { SharedModule } from './shared/shared.module';
import { ExtractTokenMiddleWare } from './shared/extractTokenMiddleware';
import { BooksprojectModule } from './booksproject/booksproject.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { booksOrmAsync } from './booksproject/config/config';
import Book from './entities/book.entity';
import LibraryInventory from './entities/book_inventory.entity';
import BookInventoryBooks from './entities/book_inventory_books.entity';
import Category from './entities/category.entity';
import User from './entities/user.entity';
import { BooksprojectService } from './booksproject/booksproject.service';
// import { UserSignUpEntity } from './booksproject/userEntities/signup.entities';
import dataSourceInstance from './config/database/connections/default';


@Module({
  // imports: [BookApiModule, AuthModule, SharedModule, BooksprojectModule],
  imports: [SharedModule, BooksprojectModule, TypeOrmModule.forRootAsync({
    name: 'default',
    useFactory: () => ({}),
    dataSourceFactory: async () => {
      if (!dataSourceInstance.isInitialized) {
        dataSourceInstance.setOptions({ entities: ['dist/**/*.entity.js'] });
        await dataSourceInstance.initialize();
      }

      return dataSourceInstance;
    },
  }),
  
],
  controllers: [AppController],
  providers: [AppService, BooksprojectService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExtractTokenMiddleWare).exclude('/auth/*').forRoutes('*');
    }
}


//   TypeOrmModule.forRoot({
  //   type:"postgres",
  //     host: "localhost",
  //     port: 5432,
  //     username: "postgres",
  //     password: "12345",
  //     database: "AbuLibrary",
  //     entities: [BookInventoryBooks, LibraryInventory, Book, Category, User],
  //     synchronize: true,
  //     logging: true
  // })