const { Router } = require("express");
const router = Router();

const UserController = require("../../controllers/user")

router.post('/create', UserController.create);
router.get('/',UserController.showAll)
router.patch('/update/:id',UserController.update)
router.delete('/delete/:id',UserController.delete)
module.exports = router;

export {}