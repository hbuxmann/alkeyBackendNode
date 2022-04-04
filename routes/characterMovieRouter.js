const express = require('express');
const router = express.Router();
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');
const characterMovieController = require('../controllers/characterMovieController');



router.post("/create",          tokenValidationMiddleware,  characterMovieController.create);
router.delete("/:id/delete",    tokenValidationMiddleware,  characterMovieController.delete);
router.get("/",                 tokenValidationMiddleware,  characterMovieController.list);


module.exports = router;

