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
const book_1 = require("../../models/enteties/book");
const author_1 = require("../../models/enteties/author");
const typeorm_1 = require("typeorm");
const sale_1 = require("../../models/enteties/sale");
class BookController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookName, publishYear, authorId, saleId } = req.body;
            const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
            const authorRepository = (0, typeorm_1.getRepository)(author_1.Author);
            const saleRepository = (0, typeorm_1.getRepository)(sale_1.Sale);
            const author = yield authorRepository.findOne({
                where: {
                    id: authorId
                }
            });
            const sale = yield saleRepository.findOne({
                where: {
                    id: saleId
                }
            });
            const book = bookRepository.create({
                book_name: bookName,
                publish_year: publishYear,
            });
            if (!author) {
                return res.status(500).json({ message: 'User not found' });
            }
            if (!sale) {
                return res.status(500).json({ message: 'Sale not found' });
            }
            book.author = author;
            book.sale = sale;
            yield bookRepository.save(book);
            return res.status(201).json(book);
        });
    }
    showAllInfoBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const books = yield bookRepository.find({
                    relations: ["author", "sale", "users"],
                });
                return res.json(books);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    showAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const books = yield bookRepository.find({
                    relations: ["author"]
                });
                return res.json(books);
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
            const { bookName, publishYear, authorId, saleId } = req.body;
            try {
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const book = yield bookRepository.findOne({
                    where: {
                        id: id
                    }
                });
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }
                book.book_name = bookName;
                book.publish_year = publishYear;
                book.author = authorId;
                book.sale = saleId;
                yield bookRepository.save(book);
                return res.status(201).json(book);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
module.exports = new BookController();
//# sourceMappingURL=index.js.map