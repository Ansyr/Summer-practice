"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const router = Router();
const UserController = require("../../controllers/user");
router.post('/create', UserController.create);
module.exports = router;
//# sourceMappingURL=index.js.map