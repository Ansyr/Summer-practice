import {Book} from "../../create-user/model/type.ts";

export interface BookWithPrice extends Omit<Book,"author">{
    bookName: string,
    publishYear: string,
    authorId: number,
    price: number,
    discount: number,
    amount: number
}