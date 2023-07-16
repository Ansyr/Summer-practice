import {NextFunction, Request, Response} from "express";
import {Author} from "../../models/enteties/author";
import {getRepository} from "typeorm";
import * as console from "console";
import {Book} from "../../models/enteties/book";
import {Sale} from "../../models/enteties/sale";


class AuthorController {
    async create(req: Request, res: Response) {
        const {
            firstname,
            lastname,
            surname,
        } = req.body
        const authorRepository = getRepository(Author)
        const author = authorRepository.create({
            first_name: firstname,
            last_name: lastname,
            sur_name: surname,
        })
        await authorRepository.save(author)
        return res.status(201).json(author);
    }

    async showAll(req: Request, res: Response) {
        try {
            const authorRepository = getRepository(Author)
            const authors = await authorRepository.find()

            return res.status(201).json(authors)
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }


    async update(req: Request, res: Response) {

        const {id} = req.params
        const {
            firstname,
            lastname,
            surname
        } = req.body
        console.log(req.body)
        try {
            const authorRepository = getRepository(Author)
            const author = await authorRepository.findOne({
                where: {
                    id: id
                }
            })

            if (!author) {
                return res.status(404).json({message: "Author not found"});
            }
            author.first_name = firstname
            author.last_name = lastname
            author.sur_name = surname


            const updatedAuthor = await authorRepository.save(author);

            return res.status(200).json(updatedAuthor);

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const authorRepository = getRepository(Author);
            const author = await authorRepository.findOne({where:{id:id}, relations: ["books"] });

            if (!author) {
                return res.status(404).json({ message: "Author not found" });
            }

            // Delete associated sales and books
            const bookRepository = getRepository(Book);
            const bookIds = author.books.map((book) => book.id);
            const saleRepository = getRepository(Sale);

            await bookRepository.delete(bookIds);
            // Delete sales associated with the books
            await Promise.all(
                bookIds.map(async (bookId) => {
                    const book = await bookRepository.findOne({where:{id:bookId}, relations: ["sale"] });
                    if (book) {
                        const saleId = book.sale.id
                        await saleRepository.delete(saleId);
                    }
                })
            );

            // Delete the books


            // Delete the author
            await authorRepository.remove(author);

            return res.status(200).json({ message: "Author and associated books and sales deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}


module.exports = new AuthorController()