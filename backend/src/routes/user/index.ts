const { Router } = require("express");
const router = Router();

const UserController = require("../../controllers/user")

router.post('/create', UserController.create);
module.exports = router;

export {}