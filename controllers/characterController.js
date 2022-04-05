const { send } = require('express/lib/response');
const db = require('../database/models');
// const Movie = require('../database/models/Movie');
const Op = db.Sequelize.Op;


const characterController = {
    //
    list: async function(req, res){
        try {
            // buscar por nombre o edad de los actores
            if (req.query.name !== undefined || req.query.age !== undefined){
                let age = -10;
                if (req.query.age !== undefined){
                    age = req.query.age;
                }
                const characters = await db.Character.findAll({                    
                    include: [{association: "movies"}], // funciona bien
                    // include: {association: "movies"}, // funciona bien
                    // include: "movies", // funciona bien
                    attributes: ['id', 'image', 'name', 'weight', 'age'],
                     where: {                        
                      // busca ya sea por el campo 'age' como por 'edad'
                      [Op.or]: [
                        {name:  { [Op.like]: '%' + req.query.name  + '%' }},
                        {age:   age  }
                      ]
                  }
                });                
                if (characters.length === 0 ){
                    return sendBack(res, false, 404, 'There are no characters');
                }
                return sendBack(res, true, 200, 'OK', characters);
            };
            // buscar los actores por nombre o ID de pelicula
            if (req.query.movies !== undefined || req.query.movieId !== undefined){
                //
                let id = 0;
                if (req.query.movieId  !== undefined) {
                    id = req.query.movieId;
                };
                console.log('Id-->'+id);
                const characters = await db.Character.findAll({                    
                    include:{
                        model: db.Movie,
                        as: "movies",
                        where: {
                                [Op.or]: [
                                    {title:  { [Op.like]: '%' + req.query.movies  + '%' }},                                    
                                    {id:   id }
                                ]                          
                        }
                    }
                });
                //
                if (characters.length === 0 ){
                    return sendBack(res, false, 404, 'There are no characters');
                }
                return sendBack(res, true, 200, 'OK', characters);
            };


            const characters = await db.Character.findAll({
                attributes: ['image', 'name']
            });
            return sendBack(res, true, 200, 'OK', characters);
        } catch(err) {
            return sendBack(res, false, 500, err);          
        }

    },

    findById: async function(req, res){
        // res.send('llegamos hasta acá!');
        try {
            const character = await db.Character.findByPk(req.params.id, {
                  include: [{association: "movies"}]
            });
            //
            if (character === null) {
                return sendBack(res, false, 404, 'Character was not found'); 
            }
            return sendBack(res, true, 200, 'OK', character);
            //
        } catch(err) {
            return sendBack(res, false, 500, err);            
        }

    },
    relate: async function(req, res){  
        //
        try {
            // 
            const characterId   =    req.params.idc;
            const movieId       =    req.params.idm;
            //
            const result =  await db.Charactermovie.create({
                movieId,
                characterId,
                createdAt: new Date(),
                updatedAt: new Date() 
            });            
            //
            return sendBack(res, true, 201, 'Character Movie relation was created');
            //
        } catch(err) {
            return sendBack(res, false, 500, err);              
        }
    },
    create: async function(req, res){      
        //
        try {
            // data validation process
            const { image, name, age, weight, history  } = req.body;

            if (!(image && name)){
                return sendBack(res, false, 401, 'Missing critical data, please check your request', req.body);              
            }; 

            const result =  await db.Character.create({
                image,
                name,
                age, 
                weight,
                history,
                createdAt: new Date(),
                updatedAt: new Date() 
            });            
            //
            return sendBack(res, true, 201, 'Character was created');
            //
        } catch(err) {
            return sendBack(res, false, 500, err);              
        }

    },
    update: async function(req, res){
        // res.send('llegamos hasta acá!');
        try {
            //
            const { image, name, age, weight, history  } = req.body;
            //
            const rowsAffected = await db.Character.update({
                image: image,
                name,
                age, 
                weight,
                history,
                updatedAt: new Date()
            },
            {
                where: { id: req.params.id} 
            });

            if (rowsAffected == 0) {
                return sendBack(res, false, 404, 'There are no characters with that ID');  
            }
            return sendBack(res, true, 201, 'The character was updated');  


        } catch(err) {
            return sendBack(res, false, 500, err);            
        }

    },
    delete: async function(req, res){
        //
        try {
            //first delete the relations
            const rowsRelation = await db.Charactermovie.destroy({
                where: {
                    characterId: req.params.id
                }
            });
            //then delete the target
            const rowsAffected = await db.Character.destroy({
                where: {
                    id: req.params.id
                }
            });
            //
            if (rowsAffected == 0) {
                return sendBack(res, false, 404, 'There are no characters with that ID');                    
            } 
            return sendBack(res, true, 201, 'The character was deleted');
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


