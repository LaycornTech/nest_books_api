import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
// import { users } from 'src/lib/db';
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
// import User from 'src/entities/userr.en/tity';
import { BooksprojectService } from 'src/booksproject/booksproject.service';
import Book from 'src/entities/book.entity';
import { users } from 'src/lib/db';
import User from 'src/entities/user.entity';
import UsersInterf from 'src/entities/userinterface.entity';
// import { AuthController } from '../controllers/auth.controller';
// import {user} from

@Injectable()

export class AuthService {
    constructor(private booksservice: BooksprojectService){}
    jwtService: any;
    async signup(signupUserData: User): Promise<{access_token} | string> { // added this ===> Promise<{access_token} | string>
        const existingUser = users.find((u) => u.email === signupUserData.email )

        
        if (existingUser) {
            throw new HttpException('User Exists!', HttpStatus.BAD_REQUEST);
        }
        // const payload = { sub: existingUser.id, username: existingUser.firstName}
        // return { access_token: await this.jwtService.signAsync(payload)}

        const saltRound = 10;
        const passwordHash = await hash(signupUserData.passwordHash as string, saltRound);

        // delete signupUserData.password;
        signupUserData.passwordHash = passwordHash;
        signupUserData.passwordHash = undefined;

        users.push(signupUserData);
        return 'User was created successfully';
    }
    
    
    
//Record<string, unknown> ==> if user supplied email and password, then process
//     async signup(signupUserData: Record<string, unknown>) {
//         const existingUser = users.find((u) => u.email === signupUserData.email )
//         if (existingUser) {
//             throw new HttpException('User Exists!', HttpStatus.BAD_REQUEST);
//         }

    async signin(signinUserData: User): Promise<{token}> {
        const user = users.find((u) => u.email === signinUserData.email)
        const userPassword = signinUserData.passwordHash;
        const passwordHash = user.passwordHash;
        const isValid = await compare(userPassword as string, passwordHash);
        if (!isValid) {
            throw new HttpException('Password invalid', HttpStatus.UNAUTHORIZED);
        }

//         delete signupUserData.password;
//         signupUserData.passwordHash = passwordHash;
    const payload = { user: {
        id: user.id
        }
    };
    const token = sign(payload, 'thisisthesecret');
    return {token}
    }
}

