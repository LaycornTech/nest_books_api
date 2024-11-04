import { IsNumber } from "class-validator";
import Book from "src/entities/book.entity";



export class AmountOfBooks{
    push(deleteBorrowed: Book) {
        throw new Error('Method not implemented.');
    }
    @IsNumber()
    amount: number | []
    length: AmountOfBooks;
}