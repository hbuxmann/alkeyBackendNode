const express = require('express');
const router = express.Router();
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');
const movieController = require('../controllers/movieController');


router.post("/:idm/character/:idc/relate",   tokenValidationMiddleware,  movieController.relate);
router.post("/create",                      tokenValidationMiddleware,  movieController.create);
router.put("/:id/update",                   tokenValidationMiddleware,  movieController.update);
router.delete("/:id/delete",                tokenValidationMiddleware,  movieController.delete);
router.get("/:id/find",                     tokenValidationMiddleware,  movieController.findById);
router.get("/",                             tokenValidationMiddleware,  movieController.list);


module.exports = router;