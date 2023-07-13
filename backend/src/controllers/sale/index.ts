import {Request, Response} from "express";
import {Sale} from "../../models/enteties/sale";
import {getRepository} from "typeorm";


class SaleController {
    async create(req: Request, res: Response) {
        const {discount, price, amount, bookId} = req.body;

        try {
            const saleRepository = getRepository(Sale)

            const sale = saleRepository.create({
                discount: discount,
                price: price,
                amount: amount,
            })

            await saleRepository.save(sale)
            return res.status(201).json(sale)
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Internal server error",
            });
        }
    }
}

module.exports = new SaleController();