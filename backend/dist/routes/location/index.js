"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('express');
const router = new Router();
const locationController = require("../../controllers/location");
router.post('/', locationController.create);
module.exports = router;
//# sourceMappingURL=index.js.map