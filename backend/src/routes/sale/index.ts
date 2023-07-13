const Router = require('express')
const router = new Router()

const saleController = require("../../controllers/sale")

router.post('/',saleController.create)

module.exports = router


export {}