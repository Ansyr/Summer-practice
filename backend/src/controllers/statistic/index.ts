import {Request, Response} from "express";
import {getRepository, IsNull, Not} from "typeorm";
import {Book} from "../../models/enteties/book";
import {Location} from "../../models/enteties/location";
import {User} from "../../models/enteties/user";
import * as console from "console";

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
            return res.status(500).json({message: "Internal server error"});
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
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async predictSal1e(req: Request, res: Response) {
        try {
            const bookRepository = getRepository(Book);
            const books = await bookRepository.find({
                relations: ["sale"],
            });

            let totalAmount = 0;
            for (const book of books) {
                totalAmount += book.sale?.amount || 0; // Учтите, что sale может быть null, поэтому используется условный оператор "?"
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            const response = {
                year: currentYear,
                salesVolume: totalAmount,
            };

            console.log(response)

            function linearRegression(data) {
                const n = data.length;
                let sumX = 0;
                let sumY = 0;
                let sumXY = 0;
                let sumX2 = 0;

                for (let i = 0; i < n; i++) {
                    const {year, salesVolume} = data[i];
                    sumX += year;
                    sumY += salesVolume;
                    sumXY += year * salesVolume;
                    sumX2 += year * year;
                }

                const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
                const intercept = (sumY - slope * sumX) / n;

                return {slope, intercept};
            }

            // Вычисление объема продаж по прогнозным годам
            function forecastSales(regression, years) {
                const {slope, intercept} = regression;
                const forecastData = [];

                for (let i = 0; i < years.length; i++) {
                    const year = years[i];
                    const salesVolume = slope * year + intercept;
                    forecastData.push({year, salesVolume});
                }

                return forecastData;
            }

            // Вычисление линейной регрессии на основе имеющихся данных
            const regression = linearRegression([response]); // Передаем данные в виде массива

            // Годы для прогноза
            const forecastYears = [String(new Date().getFullYear() + 1), String(new Date().getFullYear() + 2), String(new Date().getFullYear() + 3)];

            // Прогноз объема продаж на ближайшие три года
            const forecastData = forecastSales(regression, forecastYears);

            // Округление значений объема продаж до двух знаков после запятой
            const roundedForecastData = forecastData.map((data) => ({
                year: data.year,
                salesVolume: Math.round(data.salesVolume * 100) / 100,
            }));

            return res.status(200).json(roundedForecastData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }

    async predictSale(req: Request, res: Response) {
        try {
            const bookRepository = getRepository(Book);

            const booksByYear = await bookRepository
                .createQueryBuilder("book")
                .leftJoin("book.sale", "sale") // Добавляем связь LEFT JOIN с таблицей "sale"
                .select("EXTRACT(YEAR FROM book.added_date)", "year")
                .addSelect("SUM(sale.amount)", "salesVolume") // Обновляем выражение для суммирования
                .groupBy("EXTRACT(YEAR FROM book.added_date)")
                .orderBy("year", "ASC")
                .getRawMany();

            const formattedData = booksByYear.map((data) => ({
                year: parseInt(data.year),
                salesVolume: parseInt(data.salesVolume),
            }));

            let totalAmount = 0;
            for (const book of formattedData) {
                totalAmount += book.salesVolume;
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            const response = {
                year: currentYear,
                salesVolume: totalAmount,
            };

            function linearRegression(data) {
                const n = data.length;
                let sumX = 0;
                let sumY = 0;
                let sumXY = 0;
                let sumX2 = 0;

                for (let i = 0; i < n; i++) {
                    const { year, salesVolume } = data[i];
                    sumX += year;
                    sumY += salesVolume;
                    sumXY += year * salesVolume;
                    sumX2 += year * year;
                }

                const slope = Math.trunc((n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX));
                const intercept = Math.trunc(sumY - slope * sumX) / n;

                return { slope, intercept };
            }

// Вычисление объема продаж по прогнозным годам
            function forecastSales(regression, years) {
                const { slope, intercept } = regression;
                const forecastData = [];

                for (let i = 0; i < years.length; i++) {
                    const year = years[i];
                    const salesVolume = slope * year + intercept;
                    forecastData.push({ year, salesVolume });
                }

                return forecastData;
            }

// Вычисление линейной регрессии на основе имеющихся данных
            const regression = linearRegression(formattedData);

// Годы для прогноза
            const forecastYears = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3];

// Прогноз объема продаж на ближайшие годы
            const forecastData = forecastSales(regression, forecastYears);

// Округление значений объема продаж до двух знаков после запятой
            const roundedForecastData = forecastData.map((data) => ({
                year: data.year,
                salesVolume: Math.round(data.salesVolume * 100) / 100,
            }));

// Объединение текущих данных и прогноза
            const combinedData = [...formattedData, ...roundedForecastData];

            return res.status(200).json(combinedData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal server error"});
        }
    }


}


module.exports = new StatisticController();