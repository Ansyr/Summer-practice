import {Request, Response} from "express";

import {UserInfo} from "../../models/enteties/user-info";
import {Book} from "../../models/enteties/book";
import {User} from "../../models/enteties/user";
import {Location} from "../../models/enteties/location";
import {getRepository} from "typeorm";


// Post запрос для создания полной информации о user и добавление книги
class UserController {
    async create(req: Request, res: Response) {
        const {
            firstname,
            lastname,
            surname,
            phoneNumber,
            birthDate,
            degreeEducation,
            booksIds,
            locationId
        } = req.body;
        try {
            const userRepository = getRepository(User);
            const bookRepository = getRepository(Book);
            const userInfoRepository = getRepository(UserInfo)

            const locationRepository = getRepository(Location)
            const location = await locationRepository.findOne({
                where:{
                    id:locationId
                }
            })

            const userInfo = userInfoRepository.create({
                birth_date: birthDate,
                degree_education: degreeEducation,
            });
            if(!location){
                return res.status(500).json({message: 'User not found'});
            }
            userInfo.location = location
            await userInfoRepository.save(userInfo);

            // Create a new user
            const user = new User();
            user.first_name = firstname;
            user.last_name = lastname
            user.sur_name = surname
            user.phone_number = phoneNumber;
            user.user_info = userInfo


            // Find the books by their IDs
            const books = await bookRepository.findByIds(booksIds);

            // Assign the books to the user
            user.books = books;

            // Save the user
            await userRepository.save(user);

            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}

module.exports = new UserController();
