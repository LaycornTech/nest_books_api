import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AvailabilityStatus } from "../lib/enum/availability.enum";
import Book from "./book.entity";
import LibraryInventory from "./book_inventory.entity";

@Entity()
export default class BookInventoryBooks {
    // @PrimaryGeneratedColumn({ type: 'bigint' })
    
    
    // id: number;

    @PrimaryColumn({ type: 'bigint' })
    bookId: string;

    @Column({type: "enum", enum: AvailabilityStatus })
    availability_status: AvailabilityStatus
    
     @PrimaryColumn({type:"bigint"})
    bookInventoryId: string;

    //
    @OneToMany(()=>Book, bk=>bk.id)
    book: Book;

    @ManyToOne(() => LibraryInventory, (libInv) => libInv.bookInventoryBook)
    bookInventory: LibraryInventory;
}

