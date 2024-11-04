import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import Category from "src/entities/category.entity";
import LibraryInventory from "src/entities/book_inventory.entity";
import { AvailabilityStatus } from "src/lib/enum/availability.enum";
import BookInventoryBooks from "src/entities/book_inventory_books.entity";
import { AuthTokenPayload, InventoryType } from "src/lib/types/type";
import { IsAuthenticated } from 'src/shared/IsAuthenticated';
import Book from 'src/entities/book.entity';
import { error } from 'console';
import {DataSource, EntityManager, In, Repository} from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { CreateBookDto } from './dto/createBookdto';
import { UserRegisterDto } from './dto/user.reg';
// import { UserSignUpEntity } from './userEntities/signup.entities';
import { compare, hash } from 'bcrypt';
import { UserSigninDto } from './dto/signin.dto';
import { IsStrongPassword } from 'class-validator';
import { updateBooksDto } from './dto/updateBookDto';
import { AmountOfBooks } from './dto/amountOfbooks.dto';
import { books } from 'src/lib/db';
import UserBorrowedBooks from 'src/entities/user_borrow_bks.entity';
import jwt from "jsonwebtoken"
import { AuthorDto } from './dto/author';



// @Injectable()
// export class BooksprojectService {
//     entityManager: EntityManager;
// constructor(datasource: DataSource){
//     this.entityManager = datasource.createEntityManager();
// }

// async getAllBooksInDB(){
//     return await this.entityManager.find(Book)
// }

// async getSpecificBook(id: number){
//     return await this.entityManager.findOne(Book, {where: {
//         id
//     }})
// }

// async userBorrowedBooks(id: number){
//     let booksBorrowedbyUser = this.getSpecificBook(id)
//     if (!booksBorrowedbyUser) {
//         throw new NotFoundException({msg: "Book not available"})
//     }
    
//     // const libraries: Array<Object> = [{bookId: Number}]
//     // libraries.push(booksBorrowedbyUser)
//     // return libraries
//     const libraries: {bookId: number, uderId:number}[] =[]
    
// }


// // userBorrowedBooks: {bookId: number, userId: number}[] = []

// // //for borrowing books
// // async borrowBook(bookId: number, userId: number) {
// //     const referencedBookInventory = this.bookInventoryBooks.find((b) => b.bookId === bookId);

// //     if (!referencedBookInventory) {
// //         throw new HttpException("Referenced book not found.", HttpStatus.BAD_REQUEST);
// //     }

// //     if (referencedBookInventory.availability_status === AvailabilityStatus.BORROWED) {
// //         throw new HttpException("Reference book has already been borrowed.", HttpStatus.NOT_FOUND) 
// //     }

// //     referencedBookInventory.availability_status = AvailabilityStatus.BORROWED
// //     const referencedBook = this.books.find((b) => b.id === bookId);
// //     this.userBorrowedBooks.push({ bookId, userId});
    
// //     return referencedBook;
    
// // }
// // //for getting all borrows
// // async getBorrowedBooks(userId: number) {
// //     const userBorrowedBooks = this.userBorrowedBooks.filter((bbk) => bbk.userId === userId);
// //     const borredBooksIds = userBorrowedBooks.map((ubbk) => ubbk.bookId)
// //     return this.books.filter((bbk) => borredBooksIds.includes(bbk.id));
// //     // return this.books.filter((bbk) => userBorrowedBooks.map((ubbk) => ubbk.bookId).includes(bbk.id));/
// // }

// // //set availabilty status to Available and get it off  list of borrowed 

// // async returnedBooks(bokId:number){
// //     let checAvailabilty = AvailabilityStatus.BORROWED
// //     // const checBorrowedBook = this.books.find(bk => bk.id === bokId)

// //     const checBorrowedBook = this.userBorrowedBooks.find(bk => bk.bookId === bokId)
    
// //     if (!checBorrowedBook && checAvailabilty) {
// //     throw new HttpException('Book is either Unavailable in Borrowed Books list or had been returned', HttpStatus.BAD_REQUEST)
// //     }
// //     checAvailabilty = AvailabilityStatus.AVAILABLE
// //     // const allBorrowedBooks = this.books.filter(bk => bk.id !== checBorrowedBook)
// //     // return allBorrowedBooks
// //     }
    
// //     async getAllBooks():Promise<Book[]>{
// //         return this.books
// //     }
    
// }


@Injectable()
export class BooksprojectService{
    // borrowBook(id: any, id1: number) {
    //     throw new Error('Method not implemented.');
    // }
    // getAllBooks(): Book[] | PromiseLike<Book[]> {
    //     throw new Error('Method not implemented.');
    // }
    // constructor(@InjectRepository(Book) private readonly bookrepo: Repository<Book>){}
entityManager: EntityManager;
constructor(datasource: DataSource){
    this.entityManager = datasource.createEntityManager()
}

async signUp(userReg: UserRegisterDto){



    const newPerson = new User();
    
    newPerson.firstName = userReg.name
    newPerson.email = userReg.email

    if (userReg.password !== userReg.confirm) {
        throw new HttpException("Please ensure both passwords match", HttpStatus.EXPECTATION_FAILED)
    }
    const saltRounds = 10
    const hashedPassword = await hash(userReg.password, saltRounds)
    newPerson.passwordHash = hashedPassword
   
    await this.entityManager.save(newPerson);

    // const payload = {
    //     user: {
    //         name: userReg.name
    //     }
    // }
    // const userToken = jwt.sign(payload, "thisisthesecret", {expiresIn: "8d"});
    // return {userToken}
}

async signIn(usersign: UserSigninDto){
    const userData = await this.entityManager.findOne(User, {where: {firstName: usersign.name}})
    if (!userData) {
        throw new ForbiddenException("Invalid user email.")
    }
    const isValid = await compare(usersign.password, userData.passwordHash)
    if (!isValid) {
        throw new UnauthorizedException("Invalid user password.")
        }
    const payload = {
        user: {
            id: userData.id
        }
    }
    const userToken = jwt.sign(payload, "thisisthesecret", {expiresIn: "8h"})

        // return HttpStatus.ACCEPTED;
    return {userToken}


//Wanna get the hashed password and compare
// using bcrypt
//======  await compare(usesign.password, )

// or
// async comparePassword(password: string, hashedPassword: string) {
//     // hash password and compare with the one in the database
//     const isPasswordCorrect = await compare(password, hashedPassword);
//     return isPasswordCorrect;
//   }
        
}

async getAllBooksInDB():Promise<Book[]>{
        return await this.entityManager.find(Book)
    }
        
async getSpecificBook(id: string, payload: AuthTokenPayload){
const oneBook= await this.entityManager.findOne(Book, {where: {id}});

    if (!payload.user.id){
        throw new HttpException("You are not eligible to borrow books here", HttpStatus.FORBIDDEN)
    }
    if(!oneBook){
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    }
    return oneBook
}

async createBook(createBook: CreateBookDto, id: number):Promise<void | HttpException>{
const getUser = await this.entityManager.find(User, {where: {id:id}})
if (!getUser) {
    return new HttpException("Cannot create book", HttpStatus.BAD_REQUEST)
}
const newBook = new Book()
newBook.author = createBook.author
newBook.title = createBook.title
newBook.publication_year = createBook.publication_year
newBook.description = createBook.description
   await this.entityManager.save(newBook)

}


async BorrowBooks(id: string, payload: AuthTokenPayload){
    const referencedBookInventory = await this.entityManager.findOne(BookInventoryBooks, {where: {bookId: id}});

    if (!referencedBookInventory || !payload.user.id) {
        throw new HttpException("Book not found or You are not Authorized to borrow books.", HttpStatus.BAD_REQUEST);
    }

    if (referencedBookInventory.availability_status === AvailabilityStatus.BORROWED) {
        throw new HttpException("Reference book has already been borrowed.", HttpStatus.NOT_FOUND) 
    }


    
    
    const referencedBook = await this.entityManager.findOne(Book, {where: {id}})
    
    const userBorrowedBooks = new UserBorrowedBooks()
    userBorrowedBooks.booksId = referencedBook.id;
    userBorrowedBooks.userId = String(payload.user.id)

    referencedBookInventory.availability_status = AvailabilityStatus.BORROWED;

    
    return await this.entityManager.save([userBorrowedBooks, referencedBookInventory])
     
    // const userBorrowedBooks: {bookId: number, userId: number}[] = []
    // userBorrowedBooks.filter((bk)=> bk.userId === payload.user.id)
    // const bookBorrowedForRemoval =  await this.entityManager.find(Book)
    // bookBorrowedForRemoval.filter((bk)=> userBorrowedBooks.map((ubbk)=> ubbk.bookId).includes(bk.id))    
}


async ListOfBorrowedBooks(userId: string){
        const userBorrowedBooks = await this.entityManager.find(UserBorrowedBooks, {where:{userId}})
        //Gives list of borrowed books by this user
        const borrowedbooks = userBorrowedBooks.map((ubbk)=> ubbk.booksId)
        const bookList = await this.entityManager.find(Book, {
            where: {
                id: In(borrowedbooks)
            }
        })
        
        // return bookList.filter((bbk)=> borrowedbooks.includes(bbk.id))
        return bookList;
}
// =======================================================================================================
//     const borrowSpecificBook = await this.getSpecificBook(id, payload);
//     const checAvailabilty = await this.entityManager.findOne(BookInventoryBooks, {where: {bookId:borrowSpecificBook.id}});
//     checAvailabilty.availability_status = AvailabilityStatus.BORROWED 
//     if(checAvailabilty.availability_status === AvailabilityStatus.BORROWED){
//         throw new HttpException("Book Borrowed by Another User", HttpStatus.NOT_FOUND)
//     }
//     const listOfBooksBorrowed =  new Book()
//     listOfBooksBorrowed.booksId = borrowSpecificBook.id;
//     // listOfBooksBorrowed.userId =  Number(payload.user.id)
//     checAvailabilty.availability_status = AvailabilityStatus.BORROWED
// // ErrorPROMPT = Cannot set properties of null (setting 'availability_status')
//     return await this.entityManager.save(listOfBooksBorrowed); 
//=================     return await this.entityManager.find(this.BorrowBooks)================



    async returnedBooks(bookId: string, userId: string){
       const refBookInCollection = await this.entityManager.findOne(UserBorrowedBooks, {where: {booksId: bookId}});
            
    const referencedBookInventory = await this.entityManager.findOne(BookInventoryBooks, {where: {bookId: bookId}});
        
        

        if(!refBookInCollection){
            throw new HttpException("Book not in your book list", HttpStatus.NOT_FOUND)
        }

        const checBorrowedBook = await this.entityManager.find(UserBorrowedBooks, {where:{userId: userId}});
        const userReturnBooks = checBorrowedBook.map((bk)=> bk.booksId)
        
        const bookToReturn = userReturnBooks.includes(bookId)

        let checAvailabilty = referencedBookInventory.availability_status
        
        // return bookToReturn

            
            // Try mapping userId to booksId === get user first then map to books 

        if(!checBorrowedBook && checAvailabilty === AvailabilityStatus.AVAILABLE){
            throw new HttpException("Book is Unavailable in Borrowed Books list or had been returned", HttpStatus.BAD_REQUEST)
        }
        checAvailabilty = AvailabilityStatus.AVAILABLE
        // const allBorrowedBooks = this.entityManager.find(Book, {where: {id:checBorrowedBook.booksId}})
        // const allBorrowedBooks = this.entityManager.find(Book, {where: {id:bookId}})

        // return allBorrowedBooks
        return bookToReturn
    
    }
        


// filtering functionality: filter by author
//can accept arrays of authors
// sort by publication year


// ========================================================    1st solution            =================================================
async filterAuthor(author:string){
    const getBooks = await this.entityManager.find(Book)
    const findAuthors= getBooks.filter((filt)=> filt.author.toLowerCase() === author.toLowerCase())
    if(!findAuthors){
        throw new HttpException("Provided name not an Author", HttpStatus.BAD_REQUEST)
    }
    const booksAuthored = findAuthors.map((bk)=> bk.title)
    // const booksAuthored = findAuthors.map((getBooks)=> getBooks.title)
    const authorsBook = new Array();
     authorsBook.push(booksAuthored);
    //  return `The books authored by ${auth} are ${authorsBook}`
    //  return "The books authored by " + auth + " are  " + authorsBook
     return {"The books authored by ": author, authorsBook}
    // return findAuthors
}
// ============================================   1st solution End   ====================================================


filtering(filter: {author?: string; year?: string; title?: string}, payload: string){
    // SELECT "Book"."id" AS "Book_id", "Book"."title" AS "Book_title", "Book"."author" AS "Book_author", "Book"."description" AS "Book_description", "Book"."publication_year" AS "Book_publication_year", "Book"."userId" AS "Book_userId", "Book"."categoryId" AS "Book_categoryId" FROM "book" "Book" WHERE ("Book"."author" = 'Jamiu')
    if(filter.author || filter.title || filter.year){
        return this.entityManager.find(Book, {
            where: filter
        })

    }
    return;
}

sortByDate(){
const bookByPubYear = this.entityManager.find(Book, {
    order: {
        publication_year:"ASC"}
    });
    return bookByPubYear
}








async updatingBooks(id:string, updateBookdto: updateBooksDto, payload: AuthTokenPayload){
    // const targetBook = await this.bookrepo.findOne({where: {id}})
    const targetBook = await this.getSpecificBook(id,payload)
    
    return this.entityManager.save({...targetBook, ...updateBookdto})

    }



}

    //================================Attempt 1=====================================================

// async userBorrowedBooks(id: number, amount:number){
//     const listOfBorrowed = []
//     const amt = amount
//     const deleteBorrowed = await this.entityManager.findOne(Book, {where: {id}})

//     for (let list= 0; list < amt; list++){
//         if(listOfBorrowed.length > amt){
//             throw new HttpException("Request Exceeded", HttpStatus.BAD_REQUEST)
//         }
//         listOfBorrowed.push(deleteBorrowed)
//             return listOfBorrowed
//     }
//     console.log(listOfBorrowed);
    
//     return listOfBorrowed
    
    

    //================================Attempt 2=====================================================
    // const deleteBorrowed = await this.entityManager.findOne(Book, {where: {id}})
    // const listed = await this.bookrepo.find()
    // listed.filter(bk => bk.id !== id)
    // return this.entityManager.remove(deleteBorrowed) 
    //=====================================Attempt 3================================================
    // const listOfBorrowed = new Array() as unknown as AmountOfBooks
    // while (listOfBorrowed.length < amount){
    // const deleteBorrowed = await this.entityManager.findOne(Book, {where: {id}})
        
    //     listOfBorrowed.push(deleteBorrowed)
    //     return listOfBorrowed
    // }
    // return listOfBorrowed
    //=====================================================================================

// }

// async listOfBorreowed(id: number){
//     const listed = this.userBorrowedBooks(id) as unknown as Book
// }

































































// ========================================================================================
//Junk
    // async setStatus(status: AvailabilityStatus, bukId: number){
    //     let isBookAvailable = AvailabilityStatus.AVAILABLE
    //         const statusOfbook = this.bookInventoryBooks.find(bk => bk.availability_status === isBookAvailable)
    //         if (!statusOfbook) {
    //                 throw new HttpException("Book is unavailable", HttpStatus.BAD_REQUEST)
    //         }
    //         isBookAvailable = AvailabilityStatus.BORROWED
    //         return 'You have now borrowed this book' 
        
    //     }
    // const borrower = this.users.find(u=> u.id === userId)
    // const returnBookCollection: Book[] = []
    // const booksInHand = this.getBorrowedBooks(userId)

    //     if (!booksInHand){
    //         throw new HttpException("No books Borrowed yet", HttpStatus.NOT_FOUND)
    //     }
    //     const returning = booksInHand.find(bk => bk.id === bokId)
    //     returnBookCollection.push(returning)

    //     return returnBookCollection

        // const retBook = booksInHand.find(bk => bk.id === bokId)
        //  returnBookCollection.push(retBook.title)
        //  return [returnBookCollection]// gave null
        //==================================================================
        // return booksInHand.find(bk => bk.id === bokId ? returnBookCollection.push(bk.title): "Not Borrowed")
        // =================or===============================
        // booksInHand.forEach(bk=>{
        //     if (bk.id === bokId) {
        //        return returnBookCollection.push(bk.title)  
        //     }
        // return [...returnBookCollection]       
        // })

        
         //    return `the folowing books${returnBookCollection} have been returned by Borrower: ${borrower}`
        
// async getSpecBook(id: number):Promise<Book[]>{
//     const requestedBook =  this.books.find(bk => bk.id === id)
//     const listOfBooksByThisPerson: Book[] = [];

//     listOfBooksByThisPerson.push(requestedBook)
//     return listOfBooksByThisPerson
// }


