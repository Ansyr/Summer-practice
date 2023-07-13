"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('express');
const router = new Router();
const bookController = require("../../controllers/book");
router.post('/', bookController.create);
router.get('/', bookController.showAll);
router.patch('/:id', bookController.update);
module.exports = router;
//# sourceMappingURL=index.js.map