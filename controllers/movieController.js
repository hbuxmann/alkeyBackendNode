const { send } = require('express/lib/response');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const movieController = {
    //
    list: async function(req, res){
        try {
            //
            if (req.query.title !== undefined || req.query.genre !== undefined ){
                //
                let genre = 0;
                let orderByCriteria = '';
                //
                if (req.query.genre !== undefined) {
                    genre = req.query.genre;
                };
                //                
                if (req.query.order !== undefined) {
                    orderByCriteria = 'Movie.title ' + req.query.order;
                } else {
                    orderByCriteria = 'Movie.id ASC';
                };
                //
                const movies = await db.Movie.findAll({
                    // attributes: ['id', 'image', 'name', 'weight'],
                    include: [{association: "genres"}],
                    where: {                        
                        [Op.or]: [
                        {title:  { [Op.like]: '%' + req.query.title + '%' }},
                        {genreId:   genre }
                        ]
                    },
                    order: db.Sequelize.literal(orderByCriteria)
                });
                //
                if (movies.length === 0){
                    return sendBack(res, false, 404, 'There are no movies');
                }
                return sendBack(res, true, 200, 'OK', movies);
            };
            const movies = await db.Movie.findAll({
                attributes: ['image', 'title', 'release_date']
            });
            return sendBack(res, true, 200, 'OK', movies);

        } catch(err) {
            return sendBack(res, false, 500, err);

        }
    },
    findById: async function(req, res){
        try {
            const movie = await db.Movie.findByPk(req.params.id, {
                  include: [{association: "character"}]
            });
            //
            if (movie === null) {
                return sendBack(res, false, 404, 'Movie was not found');
            };
            return sendBack(res, true, 200, 'Ok', movie);
            
        } catch(err) {
            return sendBack(res, false, 500, err);          
        }

    },
    create: async function(req, res){      
        //
        try {
            // data validation process
            const { image, title, release_date, score, genreId  } = req.body;

            if (!(image && title && release_date && genreId)){
                return sendBack(res, false, 401, 'Missing critical data, please check your request');             
            }; 
            //
            const result =  await db.Movie.create({
                image,
                title,
                release_date, 
                score,
                genreId,
                createdAt: new Date(),
                updatedAt: new Date() 
            });            
            //
            return sendBack(res, true, 201, 'Movie was created');  

        } catch(err) {
            return sendBack(res, false, 500, err);   
        }

    },
    delete: async function(req, res){
        //
        try {
            //first delete the relations
            console.log('Pre borrada: ');
            const rowsRelation = await db.Charactermovie.destroy({
                where: {
                    movieId: req.params.id
                }
            });
            console.log('rowsRelation: '+rowsRelation);
            //then delete the target
            const rowsAffected = await db.Movie.destroy({
                where: {
                    id: req.params.id
                }
            });
            //
            if (rowsAffected == 0) {
                return sendBack(res, false, 404, 'There are no movies with that ID');                    
            } 
            return sendBack(res, true, 201, 'The movie was deleted');
            //            
        } catch(err) {
            return sendBack(res, false, 500, err);          
        }

    },
    //
    update: async function(req, res){
        //
        try {
            //
            const { image, title, release_date, score, genreId  } = req.body;
            //
            const rowsAffected = await db.Movie.update({
                image,
                title,
                release_date, 
                score,
                genreId,
                updatedAt: new Date()
            },
            {
                where: { id: req.params.id} 
            });
            //
            if (rowsAffected == 0) {
                return sendBack(res, false, 404, 'There are no movies with that ID');                  
            };
            return sendBack(res, true, 201, 'The movie was updated'); 
            //
        } catch(err) {
            return sendBack(res, false, 500, err);            
        }

    },
}
//
function sendBack(r, success, status_code, message, d) {
    return r.status(status_code).json({
        success: success,
        status_code: status_code,
        message: message,
        data: d
    });
};
//
module.exports = movieController;