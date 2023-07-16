const Router = require('express')
const router = new Router()

const bookController = require("../../controllers/book")

router.post('/',bookController.create)
router.get('/',bookController.showAllInfoBook)
router.patch('/update/:id',bookController.update)
router.get("/allbook",bookController.showAll)
router.delete("/delete/:id",bookController.delete)

module.exports = router


export {}