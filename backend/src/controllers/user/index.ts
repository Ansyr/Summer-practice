import {Request, Response} from "express";

import {UserInfo} from "../../models/enteties/user-info";
import {Book} from "../../models/enteties/book";
import {User} from "../../models/enteties/user";
import {Location} from "../../models/enteties/location";
import {getRepository} from "typeorm";
import * as console from "console";


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
            region, city, microdistrict, houseNum, apartment
        } = req.body;
        try {
            const userRepository = getRepository(User);
            const bookRepository = getRepository(Book);
            const userInfoRepository = getRepository(UserInfo)

            const locationRepository = getRepository(Location)
            const location = Location.create(
                {
                    region: region,
                    city: city,
                    microdistrict: microdistrict,
                    house_num: houseNum,
                    apartment: apartment
                }
            )

            await locationRepository.save(location)


            const userInfo = userInfoRepository.create({
                birth_date: birthDate,
                degree_education: degreeEducation,
                location: location
            });
            if (!location) {
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
            books.map(item => item.added_count++)

            await bookRepository.save(books)

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

    async showAll(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User)
            const users = await userRepository.find({
                relations: ["user_info", "books", "user_info.location"],
            })
            return res.status(200).json(users)
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {
            firstname,
            lastname,
            surname,
            phoneNumber,
            // birthDate,
            degreeEducation,
            booksIds,
            region,
            city,
            microdistrict,
            houseNum,
            apartment
        } = req.body;

        try {
            const userRepository = getRepository(User);
            const bookRepository = getRepository(Book);
            const userInfoRepository = getRepository(UserInfo);
            const locationRepository = getRepository(Location);

            const user = await userRepository.findOne({
                where: {id: id},
                relations: ['user_info', 'books', 'user_info.location']
            });

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            user.first_name = firstname;
            user.last_name = lastname;
            user.sur_name = surname;
            user.phone_number = phoneNumber;
            // user.user_info.birth_date = new Date(birthDate); // Convert birthDate to Date object
            user.user_info.degree_education = degreeEducation;

            const location = user.user_info.location;
            location.region = region;
            location.city = city;
            location.microdistrict = microdistrict;
            location.house_num = houseNum;
            location.apartment = apartment;

            await locationRepository.save(location);
            await userInfoRepository.save(user.user_info);
            await userRepository.save(user);

            if (booksIds && booksIds.length > 0) {
                const books = await bookRepository.findByIds(booksIds);
                books.map(item => item.added_count++);
                await bookRepository.save(books);
                user.books = books;
                await userRepository.save(user);
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const userRepository = getRepository(User);

            const user = await userRepository.findOne({
                where: {
                    id: id
                },
                relations: ['user_info', 'books', 'user_info.location'] // Include the "author" and "sale" relations
            });

            // Return an error if the book is not found
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Delete the book and its associated author and sale
            await userRepository.remove(user);

            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}
module.exports = new UserController()



