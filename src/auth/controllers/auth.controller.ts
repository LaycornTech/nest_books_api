import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import User from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        //
    }

    @Post('/signup')
    async signup(@Body() userData: User) {
        const message = await this.authService.signup(userData);
        return message;
    }

    @Post('/signin')
    async signin(@Body() userData: User) {
        return await this.authService.signin(userData);
    }

    
    // @Post('/signup')
    // async signup(@Body() userData: Record<string, unknown>) {
    //     const message = await this.authService.signup(userData);
    //     return message;
    // }
    
    
}
