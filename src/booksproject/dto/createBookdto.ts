import { IsNumber, IsString } from "class-validator";
import Category from "src/entities/category.entity";


export class CreateBookDto{

    @IsString()
    title: string;
    
    @IsString()
    author: string;

    @IsString()
    description: string

    @IsNumber()
    publication_year: Number

    @IsNumber()
    categoryId: number[]




}