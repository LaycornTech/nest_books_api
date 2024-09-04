import { Controller, Get, UseGuards } from '@nestjs/common';
import { BookApiService } from '../service/book-api.service';
import { IsAuthenticated } from 'src/shared/IsAuthenticated';
import { GetAuthPayload } from 'src/shared/getAuthTokenPayload';
import { AuthTokenPayload } from 'src/lib/types/type';
@Controller('book-api')

    export class BookApiController {

    constructor(private readonly bookapiservice: BookApiService ) {
        //
    } 
        @Get('/Booklist')
        getBook(){
            return this.bookapiservice.getBook();
        }

        @Get('borrow')
        @UseGuards(IsAuthenticated)
        borrowBook(@GetAuthPayload() payload: AuthTokenPayload) {
            // console.log('this is an protected route')
            return `This is the auth payload: ${JSON.stringify(payload)}`
        }
    }


