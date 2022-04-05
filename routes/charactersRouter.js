const express = require('express');
const router = express.Router();
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');
const characterController = require('../controllers/characterController');


router.post("/:idc/movie/:idm/relate",  tokenValidationMiddleware,  characterController.relate);
router.post("/create",                  tokenValidationMiddleware,  characterController.create);
router.put("/:id/update",               tokenValidationMiddleware,  characterController.update);
router.delete("/:id/delete",            tokenValidationMiddleware,  characterController.delete);
router.get("/:id/find",                 tokenValidationMiddleware,  characterController.findById);
router.get("/",                         tokenValidationMiddleware,  characterController.list);


module.exports = router;

