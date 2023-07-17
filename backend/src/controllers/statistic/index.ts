import {Request, Response} from "express";
import {getRepository, IsNull, Not} from "typeorm";
import {Book} from "../../models/enteties/book";
import {Location} from "../../models/enteties/location";
import {User} from "../../models/enteties/user";

// Создайте интерфейс для объекта статистики слоя населения
interface PopulationLayerStat {
    populationLayer: Location;
    readBooksCount: number;
}
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




async findMostReadPopulationLayer(req: Request, res: Response) {
    try {
        const userRepository = getRepository(User);
        const bookRepository = getRepository(Book);
        const locationRepository = getRepository(Location);

        // Получить все книги с информацией о прочитанных пользователями и их слое населения
        const books = await bookRepository.find({ relations: ["users", "users.user_info", "users.user_info.location"] });

        // Создать объект для отслеживания количества прочитанных книг по слоям населения
        const populationLayerStats: { [key: string]: PopulationLayerStat } = {};

        // Перебрать книги и пользователей для подсчета статистики
        for (const book of books) {
            for (const user of book.users) {
                const populationLayer = user.user_info.location;

                // Если слоя населения нет у пользователя, пропустить его
                if (!populationLayer) {
                    continue;
                }

                // Подсчитать количество прочитанных книг для слоя населения
                if (!populationLayerStats[populationLayer.id]) {
                    populationLayerStats[populationLayer.id] = {
                        populationLayer,
                        readBooksCount: 1,
                    };
                } else {
                    populationLayerStats[populationLayer.id].readBooksCount++;
                }
            }
        }

        // Найти слой населения с наибольшим количеством прочитанных книг
        let mostReadPopulationLayer: Location | null = null;
        let maxReadBooksCount = 0;
        Object.values(populationLayerStats).forEach((stat) => {
            if (stat.readBooksCount > maxReadBooksCount) {
                mostReadPopulationLayer = stat.populationLayer;
                maxReadBooksCount = stat.readBooksCount;
            }
        });

        return res.status(200).json(mostReadPopulationLayer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



}


module.exports = new StatisticController();