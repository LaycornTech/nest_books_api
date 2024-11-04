import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { BooksprojectService } from 'src/booksproject/booksproject.service';
import { IsAuthenticated } from 'src/shared/IsAuthenticated';
import Book from 'src/entities/book.entity';
import UsersInterf from 'src/entities/userinterface.entity';
import User from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private bookservice: BooksprojectService) {}

    @Post('signup')
    async signup(@Body() userData: User) {
        const message = await this.authService.signup(userData);
        return message;
    }

    @Post('signin')
    async signin(@Body() userData: User) {
        return await this.authService.signin(userData);
    }

    // @Get()
    // async getAllBooks(): Promise<Book[]>{
    //     return this.bookservice.getAllBooks()
    // }
    // @Get("getbook/:id")
    // @UseGuards(IsAuthenticated)
    // async getSpecificBook(@Body() param: any, book: Book){
    //     return this.bookservice.borrowBook(param.id, book.id)
    // }

    @Get("coll")
    async retrieveAllBorrowedBooks(){
        return this.bookservice
    }
}

