Software dependency:
- Node
- MySql
- Sendgrid account in order to send an email during account registration 


Before to star you must to update the following files:

1. database/config/config.js
Include your MySql instance, the user, pass and IP. The default db schema is disney_db

2. .env 
SAK --> the sendgrid application key registered in order to send email (basically this is a hash key)
SENDER --> (optional) this is the name tha will be into the sender field (e.g 'Juan Perez')
EMAIL --> the email registered with the SAK (e.g. 'juanpere@gmail.com')


- Application installation
git init
git remote add origin https://github.com/hbuxmann/alkeyBackendNode
git pull origin master
npm install

- DB object creation
npx sequelize-cli db:migrate

- DB Population
sequelize db:seed:all

- Unit tests validations
npm test

- Other key topics

Postman Collection: /postman_collection

Postman Documentation: https://documenter.getpostman.com/view/14064642/UVysxbYn