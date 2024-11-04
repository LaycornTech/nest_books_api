import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private user: UsersService){}

    @Get(":id")
    findingOneUser(@Param() params:any){
        return this.user.findOne(params.id)
    }
}
