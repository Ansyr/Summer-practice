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
const author_1 = require("../../models/enteties/author");
const typeorm_1 = require("typeorm");
const console = __importStar(require("console"));
const book_1 = require("../../models/enteties/book");
const sale_1 = require("../../models/enteties/sale");
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
            console.log(req.body);
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
                const updatedAuthor = yield authorRepository.save(author);
                return res.status(200).json(updatedAuthor);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const authorRepository = (0, typeorm_1.getRepository)(author_1.Author);
                const author = yield authorRepository.findOne({ where: { id: id }, relations: ["books"] });
                if (!author) {
                    return res.status(404).json({ message: "Author not found" });
                }
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const bookIds = author.books.map((book) => book.id);
                const saleRepository = (0, typeorm_1.getRepository)(sale_1.Sale);
                yield bookRepository.delete(bookIds);
                yield Promise.all(bookIds.map((bookId) => __awaiter(this, void 0, void 0, function* () {
                    const book = yield bookRepository.findOne({ where: { id: bookId }, relations: ["sale"] });
                    if (book) {
                        const saleId = book.sale.id;
                        yield saleRepository.delete(saleId);
                    }
                })));
                yield authorRepository.remove(author);
                return res.status(200).json({ message: "Author and associated books and sales deleted successfully" });
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