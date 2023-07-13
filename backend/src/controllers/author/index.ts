import {NextFunction, Request, Response} from "express";
import {Author} from "../../models/enteties/author";
import {getRepository} from "typeorm";


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


            await authorRepository.save(author)

            return res.status(201).json(author)

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }


}


module.exports = new AuthorController()