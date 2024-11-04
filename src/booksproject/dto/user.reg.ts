import { IsString } from "class-validator";


export class UserRegisterDto{

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string

    @IsString()
    confirm: string

}