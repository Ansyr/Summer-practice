import {Request, Response} from "express";
import {Location} from "../../models/enteties/location";
import {getRepository} from "typeorm";

class LocationController{
    async create(req:Request,res:Response){
        const {region, city, microdistrict, houseNum, apartment} = req.body
        const locationRepository = getRepository(Location)
        const location = Location.create(
            {
                region: region,
                city: city,
                microdistrict: microdistrict,
                house_num: houseNum,
                apartment: apartment
            }
        )

        await locationRepository.save(location)

        return res.status(201).json(location)
    }
}

module.exports = new LocationController()