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
const location_1 = require("../../models/enteties/location");
const typeorm_1 = require("typeorm");
class LocationController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { region, city, microdistrict, houseNum, apartment } = req.body;
            const locationRepository = (0, typeorm_1.getRepository)(location_1.Location);
            const location = location_1.Location.create({
                region: region,
                city: city,
                microdistrict: microdistrict,
                house_num: houseNum,
                apartment: apartment
            });
            yield locationRepository.save(location);
            return res.status(201).json(location);
        });
    }
}
module.exports = new LocationController();
//# sourceMappingURL=index.js.map