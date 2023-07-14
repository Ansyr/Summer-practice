const { Router } = require("express");
const router = Router();

const UserController = require("../../controllers/user")

router.post('/create', UserController.create);
router.get('/',UserController.showAll)
module.exports = router;

export {}