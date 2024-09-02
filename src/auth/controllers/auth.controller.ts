import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        //
    }

    @Post('/signup')
    async signup(@Body() userData: Record<string, unknown>) {
        const message = await this.authService.signup(userData);
        return message;
    }

    @Post('/signin')
    async signin(@Body() userData: Record<string, unknown>) {
        return await this.authService.signin(userData);
    }

    
}
