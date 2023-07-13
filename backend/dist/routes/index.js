"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userRouter = require("./user");
const authorRouter = require("./author");
const locationRouter = require("./location");
const saleRouter = require("./sale");
const bookRouter = require("./book");
router.use('/user', userRouter);
router.use('/author', authorRouter);
router.use('/location', locationRouter);
router.use('/sale', saleRouter);
router.use('/book', bookRouter);
module.exports = router;
//# sourceMappingURL=index.js.map