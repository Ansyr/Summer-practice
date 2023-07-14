interface Location {
    id?:string
    region: string,
    city: string,
    microdistrict: string,
    houseNum: number,
    apartment: number
}

interface UserInfo {
    id?: string,
    birthDate: string,
    degreeEducation: string,
    location: Location
}

interface Book {
    id?: string,
    bookName:string,
    publishYear:number
}

export interface User {
    id?: string,
    firstname: string,
    lastname: string,
    surname: string,
    phoneNumber: string,
    userInfo:UserInfo,
    books:Book[]
}