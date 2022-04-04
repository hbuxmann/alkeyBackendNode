const { send } = require('express/lib/response');
const db = require('../database/models');
// const Movie = require('../database/models/Movie');
const Op = db.Sequelize.Op;


const characterController = {
    //
    list: async function(req, res){
        try {          
            const characterMovie = await db.Charactermovie.findAll();
            return sendBack(res, true, 200, 'OK', characterMovie);
        } catch(err) {
            return sendBack(res, false, 500, err);          
        }

    },
    create: async function(req, res){      
        //
        try {
            // data validation process
            const { movieId, characterId  } = req.body;

            if (!(movieId && characterId)){
                return sendBack(res, false, 401, 'Missing critical data, please check your request');              
            }; 
            //
            const result =  await db.Charactermovie.create({
                movieId,
                characterId,
                createdAt: new Date(),
                updatedAt: new Date() 
            });            
            //
            return sendBack(res, true, 201, 'Character Movie was created');
            //
        } catch(err) {
            return sendBack(res, false, 500, err);              
        }

    },
    delete: async function(req, res){
        //
        try {
            const rowsAffected = await db.Charactermovie.destroy({
                where: {
                    id: req.params.id
                }
            });
            //
            if (rowsAffected == 0) {
                return sendBack(res, false, 404, 'There are no character movie with that ID');                    
            } 
            return sendBack(res, true, 201, 'The character movie was deleted');
            //
        } catch(err) {
            return sendBack(res, false, 500, err);
        }

    }

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
module.exports = characterController;


