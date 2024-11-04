import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import UserBorrowedBooks from "./user_borrow_bks.entity";
import Book from "./book.entity";

@Entity()
export default class User{

    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({type: "varchar"})
    firstName: string;

    @Column({type: "varchar", nullable: true })
    lastname: string;

    @Column({type: "varchar"})
    email: string;
    // passwordHash: string;

    @Column({ type: 'varchar'})
    passwordHash?: string;

    @OneToMany(() => UserBorrowedBooks, (userBorrowedBook) => userBorrowedBook.user)
    userBorrowedBooks: UserBorrowedBooks[];


    @OneToMany(()=>Book, (bk) => bk.user)
    book: Book[];


    // @OneToMany(() => UserBorrowedBooks, bbk => bbk.userId)
    // userBorrowedIdfk: UserBorrowedBooks[];
    
}