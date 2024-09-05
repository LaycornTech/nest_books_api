import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { users } from 'src/lib/db';
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import User from 'src/entities/user.entity';
// import { AuthController } from '../controllers/auth.controller';
// import {user} from

@Injectable()
export class AuthService {
    jwtService: any;
    async signup(signupUserData: User) {
        const existingUser = users.find((u) => u.email === signupUserData.email )
        if (existingUser) {
            throw new HttpException('User Exists!', HttpStatus.BAD_REQUEST);
        }
        const payload = { sub: existingUser.id, username: existingUser.firstName}
        return { access_token: await this.jwtService.signAsync(payload)}

        const saltRound = 10;
        const passwordHash = await hash(signupUserData.password as string, saltRound);

        // delete signupUserData.password;
        signupUserData.passwordHash = passwordHash;
        signupUserData.password = undefined;

        users.push(signupUserData, existingUser);
        return 'User was created successfully';
    }
    
    
    
    //Record<string, unknown> ==> if user supplied email and password, then process
//     async signup(signupUserData: Record<string, unknown>) {
//         const existingUser = users.find((u) => u.email === signupUserData.email )
//         if (existingUser) {
//             throw new HttpException('User Exists!', HttpStatus.BAD_REQUEST);
//         }

    async signin(signinUserData: User) {
        const user = users.find((u) => u.email === signinUserData.email)
        const userPassword = signinUserData.password;
        const passwordHash = user.passwordHash;
        const isValid = await compare(userPassword as string, passwordHash);
        if (!isValid) {
            throw new HttpException('Password invalid', HttpStatus.UNAUTHORIZED);
        }

//         delete signupUserData.password;
//         signupUserData.passwordHash = passwordHash;
    const payload = { sub: user.id, username: user.firstName}

        const token = sign(payload, 'thisisthesecret');
        return {token}
    }
}

