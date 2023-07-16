"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const author_1 = require("./author");
const sale_1 = require("./sale");
let Book = exports.Book = class Book extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "book_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Book.prototype, "publish_year", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_1.User, (user) => user.books),
    (0, typeorm_1.JoinTable)({
        name: 'books_users',
        joinColumn: {
            name: 'book',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user',
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Book.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_1.Author, (author) => author.books),
    (0, typeorm_1.JoinColumn)({ name: "author_id" }),
    __metadata("design:type", author_1.Author)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sale_1.Sale),
    (0, typeorm_1.JoinColumn)({
        name: "sale_id"
    }),
    __metadata("design:type", sale_1.Sale)
], Book.prototype, "sale", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)('book')
], Book);
//# sourceMappingURL=book.js.map