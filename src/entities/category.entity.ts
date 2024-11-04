import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Book from "./book.entity";

@Entity()
export default class Category {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({type: "varchar"})
    name: String;

    @Column({type: "varchar"})
    description: String;

    @OneToOne(()=>Book, bk=>bk.categoryId)
    bookfk: Book[]
}