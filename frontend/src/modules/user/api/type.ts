export interface UserApi{
        lastname: string,
        firstname: string,
        surname: string,
        birthDate: string,
        region: string,
        city: string,
        microdistrict: string,
        houseNum: number,
        apartNum: number,
        bookIds: {
            id: string[]
        }
    }