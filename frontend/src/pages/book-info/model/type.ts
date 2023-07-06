interface Price {
    discount: number,
    price: number,
    amount: number
}

interface Author {
    lastname: string,
    firstname: string,
    surname: string
}

export interface FullBookInfo{
    id?: string,
    sale: Price,
    author: Author,
    bookName: string,
    publishYear:string
}