import { Injectable } from '@nestjs/common';
import User from 'src/entities/user.entity';

// id: number;
//     firstName: string;
//     lastname: string;
//     email: string;
//     passwordHash: string;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1,
            firstName: "Jamiu",
            lastname: "Yusuf",
            email: "joy@yahoo.com",
            passwordHash: "plpop"
        },
        {
            id: 2,
            firstName: "Mafooor",
            lastname: "Niggax",
            email: "rema@yahoo.com",
            passwordHash: "luyrnm"
        }
        
];

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.firstName === username)
    }
}
