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
const author_1 = require("../../models/enteties/author");
const typeorm_1 = require("typeorm");
class AuthorController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, surname, } = req.body;
            const authorRepository = (0, typeorm_1.getRepository)(author_1.Author);
            const author = authorRepository.create({
                first_name: firstname,
                last_name: lastname,
                sur_name: surname,
            });
            yield authorRepository.save(author);
            return res.status(201).json(author);
        });
    }
    showAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorRepository = (0, typeorm_1.getRepository)(author_1.Author);
                const authors = yield authorRepository.find();
                return res.status(201).json(authors);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { firstname, lastname, surname } = req.body;
            try {
                const authorRepository = (0, typeorm_1.getRepository)(author_1.Author);
                const author = yield authorRepository.findOne({
                    where: {
                        id: id
                    }
                });
                if (!author) {
                    return res.status(404).json({ message: "Author not found" });
                }
                author.first_name = firstname;
                author.last_name = lastname;
                author.sur_name = surname;
                yield authorRepository.save(author);
                return res.status(201).json(author);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
module.exports = new AuthorController();
//# sourceMappingURL=index.js.map