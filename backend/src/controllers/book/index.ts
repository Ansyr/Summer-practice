import {Request, Response} from "express";
import {Book} from "../../models/enteties/book";
import {Author} from "../../models/enteties/author";
import {getRepository} from "typeorm";
import {Sale} from "../../models/enteties/sale";


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
                relations: ["author"]
            })
            return res.json(books);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {bookName, publishYear, authorId, saleId} = req.body;
        try {
            const bookRepository = getRepository(Book)

            const book = await bookRepository.findOne({
                where: {
                    id: id
                }
            })

            // Return an error if the book is not found
            if (!book) {
                return res.status(404).json({message: "Book not found"});
            }

            // Update the book properties
            book.book_name = bookName;
            book.publish_year = publishYear;
            book.author = authorId;
            book.sale = saleId;

            await bookRepository.save(book);

            return res.status(201).json(book);

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }
}

module.exports = new BookController()