import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BooksprojectService } from './booksproject.service';
import { AuthTokenPayload } from 'src/lib/types/type';
import { IsAuthenticated } from 'src/shared/IsAuthenticated';
import { GetAuthPayload } from 'src/shared/getAuthTokenPayload';
import Book from 'src/entities/book.entity';
import { CreateBookDto } from './dto/createBookdto';
import { updateBooksDto } from './dto/updateBookDto';
import { UserSigninDto } from './dto/signin.dto';
import { UserRegisterDto } from './dto/user.reg';
import { AmountOfBooks } from './dto/amountOfbooks.dto';
import { AuthorDto } from './dto/author';


@Controller('book')
export class BooksprojectController {
    constructor(private bookApiService: BooksprojectService){}
// routes for db endpoints
@Get("filter")
@UseGuards(IsAuthenticated)
async filterAuthor(@GetAuthPayload() payload: AuthTokenPayload, @Query() query: Record<string, unknown>){
    const result = await this.bookApiService.filtering(query, String(payload.user.id))
    return result;
}

@Post("signup")
signUp(@Body() usereg: UserRegisterDto){
    return this.bookApiService.signUp(usereg)
}

//during signin === should enhance Getauthpayload decor, then use in creating payload in signin
@Post("signin")
// @UseGuards(IsAuthenticated)
signIn(@Body() usersignin: UserSigninDto){
    return this.bookApiService.signIn(usersignin)
}

@Get("sort")
sortBooks(){
    return this.bookApiService.sortByDate()
}


@Get()
@UseGuards(IsAuthenticated)
getAllBooksInDb(){
    return this.bookApiService.getAllBooksInDB()
}

// 
// example post endpoint to create books
// TODO: remove endpoint
@Post()
async createBook(@Body() creatingBook: CreateBookDto, @GetAuthPayload() payload: AuthTokenPayload){
    // console.log("User payload", payload);
    return this.bookApiService.createBook(creatingBook, payload.user.id)
}

@Get("borrowed-books")
@UseGuards(IsAuthenticated)
getListOfBorrowedBooks(@GetAuthPayload() payload: AuthTokenPayload){
    return this.bookApiService.ListOfBorrowedBooks(String(payload.user.id))
}


@Get("/:id/return")
@UseGuards(IsAuthenticated)
returnedBooks(@Param("id") bookId: string, @GetAuthPayload() payload: AuthTokenPayload){
    return this.bookApiService.returnedBooks(bookId, String(payload.user.id))
}

@Get('/:id/borrow')
@UseGuards(IsAuthenticated)
BorrowBooks(@Param("id") id:string,  @GetAuthPayload() payload: AuthTokenPayload){
    return this.bookApiService.BorrowBooks(id, payload) //fetch id from token 
}

@Get(":id")
@UseGuards(IsAuthenticated)
getSpecificBook(@Param('id') id: string,  @GetAuthPayload() payload: AuthTokenPayload){
    return this.bookApiService.getSpecificBook(id, payload)
}

// @Get("bor/:id")
// userBorrowedBooks(@Param("id") id:number){
//     return this.bookApiService.userBorrowedBooks(id)
// }

@Patch(":id")
@UseGuards(IsAuthenticated)
updateBooks(@Body("id") id:string, updateBookdto: updateBooksDto,  @GetAuthPayload() payload: AuthTokenPayload){
    return this.bookApiService.updatingBooks(id, updateBookdto, payload)
}











//     @Get('all')
//     getAll(){
//         return this.bookApiService.getAllBooks()
//     }
//     //for borrowing
//     @Post()
//     @UseGuards(IsAuthenticated)    
//     borrowBook(@Body('bookId') bookId: number, @GetAuthPayload() payload: AuthTokenPayload ) {
//         // console.log('this is an protected route')
//         return this.bookApiService.borrowBook(bookId, payload.user.id)
//     }
// //for getting borrowed
//     @Get('/books')
//     @UseGuards(IsAuthenticated)
//     getBorrowedBooks(@GetAuthPayload() payload: AuthTokenPayload) {
//         return this.bookApiService.getBorrowedBooks(payload.user.id)
//     }

//     @Post("ret")
//     @UseGuards(IsAuthenticated)
//     returnBorrowedBooks(@Body() bookId: number, @GetAuthPayload() payload: AuthTokenPayload){
//         return this.bookApiService.returnedBooks(bookId)
//     }
}
// function UseGuards(IsAuthenticated: typeof IsAuthenticated): (target: BooksprojectController, 
// propertyKey: "borrowBook", descriptor: TypedPropertyDescriptor<(payload: AuthTokenPayload)
//  => Promise<{ id: number; title: string; categoryId: number; author: string; description: string; publication_year: number; }>>) => void | TypedPropertyDescriptor<...> {
//     throw new Error('Function not implemented.');
// }

