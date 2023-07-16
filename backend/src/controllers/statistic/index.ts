import {Request, Response} from "express";
import {getRepository, IsNull, Not} from "typeorm";
import {Book} from "../../models/enteties/book";
import {Location} from "../../models/enteties/location";


class StatisticController {
    async showPopularBooks(req: Request, res: Response) {
        try {
            const bookRepository = getRepository(Book);

            // Выполнение запроса к базе данных с ограничением в 5 записей и сортировкой по полю addedcount в порядке убывания
            const books = await bookRepository.find({
                where: {
                    added_count: Not(IsNull()),
                },
                order: {
                    added_count: "DESC",
                },
                take: 5, // Лимитирование результатов до 5 записей
            });

            return res.json(books);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async countCityOccurrences(req: Request, res: Response) {
        try {
            const locationRepository = getRepository(Location);
            const cityOccurrences = await locationRepository
                .createQueryBuilder("location")
                .select("location.city, COUNT(*) as count")
                .groupBy("location.city")
                .orderBy("count", "DESC")
                .getRawMany();

            return res.status(200).json(cityOccurrences);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}


module.exports = new StatisticController();