import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controllers/users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService, UsersModule, UsersController]
})
export class UsersModule {}
