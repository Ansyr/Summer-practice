export interface PopularBook{
    id?: string
    book_name: string,
    publish_year: number,
    added_count: number
}

export interface ReadableCity{
    city: string,
    count: string | number
}