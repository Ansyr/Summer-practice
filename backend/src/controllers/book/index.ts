import {Request, Response} from "express";
import {Book} from "../../models/enteties/book";
import {Author} from "../../models/enteties/author";
import {getRepository} from "typeorm";
import {Sale} from "../../models/enteties/sale";
import * as console from "console";


class BookController {
    async create(req: Request, res: Response) {
        const {bookName, publishYear, authorId, discount, price, amount} = req.body;
        const bookRepository = getRepository(Book)

        const authorRepository = getRepository(Author)
        const saleRepository = getRepository(Sale)


        const author = await authorRepository.findOne({
            where: {
                id: authorId
            }
        })





        const book = bookRepository.create({
            book_name: bookName,
            publish_year: publishYear,
        });
        const sale = saleRepository.create({
            price: price,
            discount: discount,
            amount: amount
        })
        if (!author) {
            return res.status(500).json({message: 'User not found'});
        }


        book.author = author

        await saleRepository.save(sale)
        book.sale = sale
        await bookRepository.save(book);

        return res.status(201).json(book);
    }

    async showAllInfoBook(req: Request, res: Response) {
        try {
            const bookRepository = getRepository(Book);
            const books = await bookRepository.find({
                relations: ["author", "sale", "users"],
            });
            console.log(books)

            return res.json(books);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async showAll(req: Request, res: Response) {
        try {
            const bookRepository = getRepository(Book)
            const books = await bookRepository.find({
                relations: ["author", "sale"]
            })
            return res.json(books);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async update(req: Request, res: Response) {
        console.log(req.body)
        const {id} = req.params;
        const {book_name, publish_year, authorId, price, discount, amount} = req.body;
        try {
            const bookRepository = getRepository(Book);

            const book = await bookRepository.findOne({
                where: {
                    id: id
                },  relations: ["sale"]
            });

            // Return an error if the book is not found
            if (!book) {
                return res.status(404).json({message: "Book not found"});
            }

            // Update the book properties
            book.book_name = book_name;
            book.publish_year = publish_year;
            book.author = authorId;
            book.sale.price = price;
            book.sale.discount = discount;
            book.sale.amount = amount;

            await bookRepository.save(book);

            return res.status(201).json(book);

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async delete(req: Request, res: Response) {
        console.log(123)
        const { id } = req.params;

        try {
            const bookRepository = getRepository(Book);

            const book = await bookRepository.findOne({
                where: {
                    id: id
                },
                relations: ["author", "sale","users"] // Include the "author" and "sale" relations
            });

            // Return an error if the book is not found
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            // Delete the book and its associated author and sale
            await bookRepository.remove(book);

            return res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new BookController()