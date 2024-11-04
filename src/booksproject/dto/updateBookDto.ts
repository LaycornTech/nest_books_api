
import { IsNumber, IsString } from "class-validator";

export class updateBooksDto{

    @IsNumber()
    id: number;

    @IsString()
    title: string;
    
    @IsString()
    author: string;

}