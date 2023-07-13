"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('express');
const router = new Router();
const userInfoController = require("../../controllers/user-info");
router.post('/', userInfoController.create);
module.exports = router;
//# sourceMappingURL=index.js.map