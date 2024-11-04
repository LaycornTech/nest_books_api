import { IsString } from "class-validator";


export class UserSigninDto{

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string


}