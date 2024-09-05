import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Request } from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        //
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async LogIn(@Body() signIndto: Record<string, unknown>) {  // I'm using singIndto
        // return this.authService.signinIn(signIndto.username, signIndto.password);
    }

    
    // @Post('/signup')
    // async signup(@Body() userData: Record<string, unknown>) {
    //     const message = await this.authService.signup(userData);
    //     return message;
    // }
    
    
}
