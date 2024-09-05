import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { users } from 'src/lib/db';
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/service/users.service';
import { JwtService } from '@nestjs/jwt';

// import { AuthController } from '../controllers/auth.controller';
// import {user} from

@Injectable()
export class AuthService {
    constructor(private userservice: UsersService, private jwtService: JwtService){}
    
    
    async signinIn(username: string, pass:string): Promise<{access_token: string}>{
        const createdUser = await this.userservice.findOne(username)
        if (createdUser.passwordHash !== pass){
            // throw new HttpException("message", HttpStatus.BAD_REQUEST, {cause: new Error("cause error")})
            throw new UnauthorizedException()
        }
        const paidload = { sub: createdUser.id, username: createdUser.firstName}
        return { access_token: await this.jwtService.signAsync(paidload)}

    }
    
    
    
    //Record<string, unknown> ==> if user supplied email and password, then process
//     async signup(signupUserData: Record<string, unknown>) {
//         const existingUser = users.find((u) => u.email === signupUserData.email )
//         if (existingUser) {
//             throw new HttpException('User Exists!', HttpStatus.BAD_REQUEST);
//         }

//         const saltRound = 10;
//         const passwordHash = await hash(signupUserData.password as string, saltRound);

//         delete signupUserData.password;
//         signupUserData.passwordHash = passwordHash;

//         users.push(signupUserData);
//         return 'User was created successfully';
//     }

// async signin(signInUserData: Record<string, any>){
//     const registeredUser = users.find(user=> user.firstName === signInUserData.name)
//     if (!registeredUser) {
//         throw new HttpException("User not Found!!", HttpStatus.BAD_REQUEST)
//     }
//     const verifyUser = await compare(registeredUser.passwordHash, signInUserData.password )
//     if (!verifyUser){
//         throw new HttpException("Password Invalid", HttpStatus.UNAUTHORIZED)
//     }
// };




    // async signin(signinUserData: Record<string, unknown>) {
    //     const user = users.find((u) => u.email === signinUserData.email)
    //     const userPassword = signinUserData.password;
    //     const passwordHash = user.passwordHash;
    //     const isValid = await compare(userPassword as string, passwordHash);
    //     if (!isValid) {
    //         throw new HttpException('Password invalid', HttpStatus.UNAUTHORIZED);
    //     }

    //     const payload = {
    //         user: {
    //             id: user.id,
    //         }
    //     };

    //     const token = sign(payload, 'authsecret');
    //     return {token}
    // }
    
}

