"use strict";
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
const sale_1 = require("../../models/enteties/sale");
const typeorm_1 = require("typeorm");
class SaleController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { discount, price, amount, bookId } = req.body;
            try {
                const saleRepository = (0, typeorm_1.getRepository)(sale_1.Sale);
                const sale = saleRepository.create({
                    discount: discount,
                    price: price,
                    amount: amount,
                });
                yield saleRepository.save(sale);
                return res.status(201).json(sale);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    msg: "Internal server error",
                });
            }
        });
    }
}
module.exports = new SaleController();
//# sourceMappingURL=index.js.map