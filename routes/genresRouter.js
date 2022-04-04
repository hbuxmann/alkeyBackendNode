const express = require('express');
const router = express.Router();
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');
const genresController = require('../controllers/genresController');



router.post("/create",          tokenValidationMiddleware,  genresController.create);
router.delete("/:id/delete",    tokenValidationMiddleware,  genresController.delete);
router.get("/",                 tokenValidationMiddleware,  genresController.list);


module.exports = router;

