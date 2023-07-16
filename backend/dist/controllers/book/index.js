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
const book_1 = require("../../models/enteties/book");
const author_1 = require("../../models/enteties/author");
const typeorm_1 = require("typeorm");
const sale_1 = require("../../models/enteties/sale");
const console = __importStar(require("console"));
class BookController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookName, publishYear, authorId, discount, price, amount } = req.body;
            const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
            const authorRepository = (0, typeorm_1.getRepository)(author_1.Author);
            const saleRepository = (0, typeorm_1.getRepository)(sale_1.Sale);
            const author = yield authorRepository.findOne({
                where: {
                    id: authorId
                }
            });
            const book = bookRepository.create({
                book_name: bookName,
                publish_year: publishYear,
            });
            const sale = saleRepository.create({
                price: price,
                discount: discount,
                amount: amount
            });
            if (!author) {
                return res.status(500).json({ message: 'User not found' });
            }
            book.author = author;
            yield saleRepository.save(sale);
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
                    relations: ["author", "sale"]
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
            const { book_name, publish_year, authorId, price, discount, amount } = req.body;
            try {
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const book = yield bookRepository.findOne({
                    where: {
                        id: id
                    }, relations: ["sale"]
                });
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }
                book.book_name = book_name;
                book.publish_year = publish_year;
                book.author = authorId;
                book.sale.price = price;
                book.sale.discount = discount;
                book.sale.amount = amount;
                yield bookRepository.save(book);
                return res.status(201).json(book);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(123);
            const { id } = req.params;
            try {
                const bookRepository = (0, typeorm_1.getRepository)(book_1.Book);
                const book = yield bookRepository.findOne({
                    where: {
                        id: id
                    },
                    relations: ["author", "sale", "users"]
                });
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }
                yield bookRepository.remove(book);
                return res.status(200).json({ message: "Book deleted successfully" });
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