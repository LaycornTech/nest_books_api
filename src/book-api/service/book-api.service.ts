import { Injectable } from '@nestjs/common';
import { books } from 'src/lib/db'
@Injectable()
export class BookApiService {
    getBook() {
        return (books);
    //  const viewbookbyId(bookId:book)
     
   }
}
 
