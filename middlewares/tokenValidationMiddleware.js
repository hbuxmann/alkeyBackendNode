const jwt = require("jsonwebtoken");

 function   tokenValidationMiddleware (req, res, next){
        const bearerHeader = req.headers ['authorization']; // lo que voy a obtener es la palabra 'Bearer' y un token.        
        //
        if(typeof bearerHeader !== 'undefined'){
            // dato que la variable bearerHeader tiene dos valores separados por un espacio, hago un split por justamente un espacio y luego tomo el 2 valor que es el token
            const bearerToken = bearerHeader.split(' ')[1]; 
            // req.token = bearerToken;            
            jwt.verify (bearerToken, process.env.TOKEN_KEY, (err, authData)=>
            {   
                if (err) {
                    return res.status(403).json({
                        success: false,
                        status_code: 403,
                        message: "Forbidden"
                    })
                }
                else {                    
                    next();
                }
            });            
            
        } else {
            return res.status(403).json({
                success: false,
                status_code: 403,
                message: "Forbidden"
            })
        }
    
    }

module.exports = tokenValidationMiddleware;





