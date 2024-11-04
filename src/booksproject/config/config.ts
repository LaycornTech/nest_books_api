import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import Book from "src/entities/book.entity"
import LibraryInventory from "src/entities/book_inventory.entity"
import BookInventoryBooks from "src/entities/book_inventory_books.entity"
import Category from "src/entities/category.entity"
// import ListOfBorrows  from "src/entities/listOfborrowedBooks"
import User from "src/entities/user.entity"
import UserBorrowedBooks from "src/entities/user_borrow_bks.entity"
import {} from "typeorm"


export default class TypeOrmConfig{

    static getOrmConfig(configservice: ConfigService):TypeOrmModuleOptions{

        return{
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    // database: configservice.get("DB_NAME"),
    database: "NewBookLibrary",
    entities:  [BookInventoryBooks, LibraryInventory, Book, Category, User, UserBorrowedBooks],
    synchronize: true,
    logging: true
        }
    }

}
    
export const booksOrmAsync:TypeOrmModuleAsyncOptions={
    useFactory: async(configservice: ConfigService): 
    Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configservice),
    imports: [ConfigModule],
    inject: [ConfigService]
}        




    
//  export const typeormconfig: TypeOrmModuleOptions = {

//     type: 'postgres',
//     host: "localhost",
//     username: "postgres",
//     port: 5432,
//     password: "lekan",
//     entities: {BookInventoryBooks, LibraryInventory,Book,Category,User },
//     // entities: [BookInventoryBooks, LibraryInventory,Book,Category,User ],
//     database: "AbuLibrary",
//     // synchronize: true,
//     logging: true
        
//     }
    
  