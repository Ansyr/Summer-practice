const Router = require('express')
const router = new Router()

const locationController = require("../../controllers/location")

router.post('/',locationController.create)

module.exports = router

export {}