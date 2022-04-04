-- challenge nico bux
-- basicamente hacer el challenge con tiempo y repasando todos los puntos, conocidos y no conocidos
-- bitácora de pasos de instalación 

C:\Users\Hernan\Documents\Digital House\Full Stack\challenge_nico_bux>

npm init
npm i express jsonwebtoken  @sendgrid/mail
npm install sequelize-cli -g
npm install sequelize
npm install mysql2

-- inicializar sequelize en el proyecto

Sequelize init


--- se produjo un error cuando ejecuté --> npx sequelize-cli db:migrate
Loaded configuration file "database\config\config.js".
Using environment "development".

ERROR: Please install mysql2 package manually

-- para solucionarlo hice lo siguiente
npm list -g --depth 0
npm uninstall -g sequelize
npm install --save sequelize



--- encripción
npm i bcryptjs 
npm i bcrypt

Cbr#30079
-- envio de email
npm i @sendgrid/mail

------- Video explicativo
https://www.youtube.com/watch?v=6qDPwsXCc2E

npm i -g sequelize-cli
 
-- .dotenvironment 
npm i dotenv

-- multer
npm i multer


-- mocha y chi
npm i mocha chai --save-dev
npm i chai-http --save-dev

-------- Documentación oficial Sequilize
https://sequelize.org/v6/manual/migrations.html


sequelize model:create --name Character --attributes image:string, name:string, age:integer, weight:double, history:string --force
sequelize model:create --name CharacterMovie --attributes  characterId:integer, movieId:integer --force
sequelize model:create --name Movie --attributes image:string, release_date:date, score:integer, genreId:integer --force
sequelize model:create --name Genre --attributes image:string --force
sequelize model:create --name User --attributes nickname:string, user:string, password:string --force
npx sequelize-cli db:migrate 
	

-- Creación de los seeders --> Ref.: https://dev.to/idmega2000/seeding-data-with-sequelize-1f3o

sequelize seed:generate --name add-genre


-- carga de los seeders
sequelize db:seed:all


Clave 1234 encriptada --> $2a$10$5R/M9F0a1hptZbp5lDZlY.y0ysEGcVwBCQ2B8KP0bepx7LcN4XIc.


$2a$10$5R/M9F0a1hptZbp5lDZlY.y0ysEGcVwBCQ2B8KP0bepx7LcN4XIc.

***** DB - creación de objetos *****
npx sequelize-cli db:migrate
***** carga de los seeders *****
sequelize db:seed:all