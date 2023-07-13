
const Router = require('express')
const router = new Router()

const authorController = require("../../controllers/author")

router.post('/',authorController.create)
router.get('/',authorController.showAll)
router.patch('/',authorController.update)
module.exports = router


export {}