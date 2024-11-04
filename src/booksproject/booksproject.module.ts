import { Module } from '@nestjs/common';
import { BooksprojectService } from './booksproject.service';
import { BooksprojectController } from './booksproject.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import BookInventoryBooks from 'src/entities/book_inventory_books.entity';
import LibraryInventory from 'src/entities/book_inventory.entity';
import Book from 'src/entities/book.entity';
import Category from 'src/entities/category.entity';
import User from 'src/entities/user.entity';
import { booksOrmAsync} from './config/config';

@Module({
  providers: [BooksprojectService],
  controllers: [BooksprojectController],
  exports: [BooksprojectService],
  // imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeormconfig)]
  // imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync(booksOrmAsync)]
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Book])]
})
export class BooksprojectModule{}
