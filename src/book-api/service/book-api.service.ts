import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { books } from 'src/lib/db'
@Injectable()
export class BookApiService {
    async getBook() {
        return (books);
    //  const viewbookbyId(bookId:book)
   }

   async getBookById(bookIdData: string){
    const GrabBook = books.find(b=> b.id.toString() === bookIdData.toString() 
    && b.categoryId.toString() === bookIdData.toString())
     if(!GrabBook){         //In idris' github this is written as if(!book)
        throw new HttpException("No book found", HttpStatus.NOT_FOUND)
    }
        return GrabBook    
    }


}
 
