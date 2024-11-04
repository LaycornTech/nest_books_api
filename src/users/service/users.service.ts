import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1,
            firstName: "Jamiu",
            lastname: "Yusuf",
            email: "joy@yahoo.com",
            password: "plpop"
        },
        {
            id: 2,
            firstName: "Mafooor",
            lastname: "Niggax",
            email: "rema@yahoo.com",
            password: "luyrnm"
        }
        
];


async findOne(email: string): Promise<object>{
        return this.users.find(user => user.email === email)
    }
}
