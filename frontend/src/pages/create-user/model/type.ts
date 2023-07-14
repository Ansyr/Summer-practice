interface Author {
    lastname: string,
    firstname: string,
    surname: string
}
export interface Book{
    id?:string,
    author:Author,
    bookName:string,
    publishYear: string
}