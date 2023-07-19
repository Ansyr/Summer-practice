const Router = require('express')
const router = new Router()

const StatisticController = require("../../controllers/statistic")

router.get('/popularbooks',StatisticController.showPopularBooks)
router.get('/readablecity',StatisticController.countCityOccurrences)
router.get('/predictsale',StatisticController.predictSale)

module.exports = router


export {}