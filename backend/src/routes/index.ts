import { Router } from 'express';


const router = Router()
const userRouter = require("./user")
const authorRouter = require("./author")
const locationRouter = require("./location")
const saleRouter = require("./sale")
const bookRouter = require("./book")

router.use('/user',userRouter)
router.use('/author',authorRouter)
router.use('/location',locationRouter)
router.use('/sale',saleRouter)
router.use('/book',bookRouter)

module.exports = router