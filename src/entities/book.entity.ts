import { Injectable } from '@nestjs/common';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category.entity';
import BookInventoryBooks from './book_inventory_books.entity';
import User from './user.entity';

// @Injectable()
@Entity()
export default class Book {
   
    @PrimaryGeneratedColumn({type: "bigint"})
    id: string;

    @Column({type: "varchar"})
    title: string;
    @Column({type: "varchar"})
    author: String;
    @Column({type: "varchar"})
    description: String;

    // @Column({type: "year"})
    @Column({type: "date"})
    publication_year: Number

    @Column({ type: 'bigint', nullable: true })
    userId: string; //not needed


    @Column({type: "numeric"})
    @OneToOne(() => Category, cat=> cat.id)
    categoryId: Category[]

    @OneToMany(()=>BookInventoryBooks, bib=> bib.bookInventoryId)
    bookInvBookIdfk: BookInventoryBooks[];

    @ManyToOne(()=>User, (user)=> user.book)
    @JoinColumn({ name: 'userId' })
    user: User[];
}