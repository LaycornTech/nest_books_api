import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryColumn,
     PrimaryGeneratedColumn
     } from "typeorm";
import Book from "./book.entity";
import User from "./user.entity";


//Shouldnt we have author included here, for certainty ??????????????
@Entity()
export default class UserBorrowedBooks {
    @PrimaryColumn({ type: 'bigint'})
    booksId: string;

    @PrimaryColumn({ type: 'bigint'})
    userId: string;         //both are prim keys, 

    // relations
    @ManyToOne(() => User, (user) => user.userBorrowedBooks)
    @JoinColumn({ name: 'userId' })
    user: User;
    
}