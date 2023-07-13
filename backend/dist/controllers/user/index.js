"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_info_1 = require("../../models/enteties/user-info");
const book_1 = require("../../models/enteties/book");
const user_1 = require("../../models/enteties/user");
const location_1 = require("../../models/enteties/location");
const typeorm_1 = require("typeorm");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, surname, phoneNumber, birthDate, degreeEducation, booksIds, locationId } = req.body;
            try {
                const userRepository = (0, typeorm_1.getRepository)(user_1.User);
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const userInfoRepository = (0, typeorm_1.getRepository)(user_info_1.UserInfo);
                const locationRepository = (0, typeorm_1.getRepository)(location_1.Location);
                const location = yield locationRepository.findOne({
                    where: {
                        id: locationId
                    }
                });
                const userInfo = userInfoRepository.create({
                    birth_date: birthDate,
                    degree_education: degreeEducation,
                });
                if (!location) {
                    return res.status(500).json({ message: 'User not found' });
                }
                userInfo.location = location;
                yield userInfoRepository.save(userInfo);
                const user = new user_1.User();
                user.first_name = firstname;
                user.last_name = lastname;
                user.sur_name = surname;
                user.phone_number = phoneNumber;
                user.user_info = userInfo;
                const books = yield bookRepository.findByIds(booksIds);
                user.books = books;
                yield userRepository.save(user);
                return res.status(201).json(user);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
module.exports = new UserController();
//# sourceMappingURL=index.js.map