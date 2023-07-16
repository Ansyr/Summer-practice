import {Author} from "../../author/api/type.ts";

export interface BookWithPrice{
    id?:string | number
    bookName: string,
    publishYear: string,
    authorId: number,
    price: number,
    discount: number,
    amount: number
}


export interface Book extends Omit<Author, "id">{
    id?:string,
    author:Author,
    bookName:string,
    publishYear: string
}