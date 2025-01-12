// import Category from "src/entities/category.entity";
// import LibraryInventory from "src/entities/book_inventory.entity";
// import { AvailabilityStatus } from "src/lib/enum/availability.enum";
// import BookInventoryBooks from "src/entities/book_inventory_books.entity";
// import { InventoryType } from "src/lib/types/type";

import { Injectable } from "@nestjs/common";
import User from "src/entities/user.entity";
import Users from "src/entities/user.entity";
import { DataSource, EntityManager } from "typeorm";

// @Injectable()
// export class con{
//     entityMan: EntityManager
//     constructor(datasource: DataSource){
//         this.entityMan = datasource.createEntityManager()
//     }
    
// }        
export const books = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        categoryId: 1,
        author: "Harper Lee",
        description: "A novel about the serious issues of rape and racial inequality.",
        publication_year: 1960
    },
    {
        id: 2,
        title: "1984",
        categoryId: 2,
        author: "George Orwell",
        description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
        publication_year: 1949
    },
    {
        id: 3,
        title: "Pride and Prejudice",
        categoryId: 1,
        author: "Jane Austen",
        description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
        publication_year: 1813
    },
    {
        id: 4,
        title: "The Great Gatsby",
        categoryId: 1,
        author: "F. Scott Fitzgerald",
        description: "A novel about the American dream and the roaring twenties.",
        publication_year: 1925
    },
    {
        id: 5,
        title: "Moby-Rick",
        categoryId: 3,
        author: "Herman Melville",
        description: "A novel about the voyage of the whaling ship Pequod and its captain's obsession with the white whale, Moby Rick.",
        publication_year: 1851
    },
    {
        id: 6,
        title: "1984",
        categoryId: 2,
        author: "George Orwell",
        description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
        publication_year: 1949
    },
    {
        id: 7,
        title: "Moby-Rick",
        categoryId: 3,
        author: "Herman Melville",
        description: "A novel about the voyage of the whaling ship Pequod and its captain's obsession with the white whale, Moby Rick.",
        publication_year: 1851
    },
    
];

// let category: Category[] = [
//     {
//         name: "Technology",
//         description: "All about the latest in tech, gadgets, and software."
//     },
//     {
//         name: "Science",
//         description: "Topics related to scientific discoveries, research, and experiments."
//     },
//     {
//         name: "Health",
//         description: "Information and tips on health, wellness, and medical advancements."
//     },
//     {
//         name: "Education",
//         description: "Resources and insights on teaching, learning, and academic life."
//     },
//     {
//         name: "Entertainment",
//         description: "Updates on movies, music, games, and pop culture."
//     }
// ];

// export let bookInventoryBooks : BookInventoryBooks[] = [
//     {
//         bookId: 1,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.BORROWED
//     },
//     {
//         bookId: 2,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.BORROWED
//     },
//     {
//         bookId: 3,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.AVAILABLE
//     },
//     {
//         bookId: 4,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.AVAILABLE
//     },
//     {
//         bookId: 5,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.AVAILABLE
//     },
//     {
//         bookId: 6,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.AVAILABLE
//     },
//     {
//         bookId: 7,
//         bookInventoryId: 1,
//         availability_status: AvailabilityStatus.AVAILABLE
//     }
// ];

// export let booksInventory : LibraryInventory[] = [
//     {
//         name: 'book Inventory',
//         type: InventoryType.Book,
//         quantity: 7,
//     }
// ];

// export const categories = [];
export let users: Users[]
