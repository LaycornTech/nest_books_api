import { InventoryType } from "../lib/types/type";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BookInventoryBooks from "./book_inventory_books.entity";

@Entity()
export default class LibraryInventory {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({type: "varchar"})
    name: string; // like book inventory
    
    @Column({type: "numeric"})
    quantity: number;
    
    @Column()
    type: InventoryType;

    @OneToMany(() => BookInventoryBooks, (bookInvBook) => bookInvBook.bookInventory)
    bookInventoryBook: BookInventoryBooks[]
}