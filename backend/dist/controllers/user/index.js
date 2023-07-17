"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const console = __importStar(require("console"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, surname, phoneNumber, birthDate, degreeEducation, booksIds, region, city, microdistrict, houseNum, apartment } = req.body;
            try {
                const userRepository = (0, typeorm_1.getRepository)(user_1.User);
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const userInfoRepository = (0, typeorm_1.getRepository)(user_info_1.UserInfo);
                const locationRepository = (0, typeorm_1.getRepository)(location_1.Location);
                const location = location_1.Location.create({
                    region: region,
                    city: city,
                    microdistrict: microdistrict,
                    house_num: houseNum,
                    apartment: apartment
                });
                yield locationRepository.save(location);
                const userInfo = userInfoRepository.create({
                    birth_date: birthDate,
                    degree_education: degreeEducation,
                    location: location
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
    showAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = (0, typeorm_1.getRepository)(user_1.User);
                const users = yield userRepository.find({
                    relations: ["user_info", "books", "user_info.location"],
                });
                return res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
module.exports = new UserController();
//# sourceMappingURL=index.js.map