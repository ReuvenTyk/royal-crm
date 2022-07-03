# royal-crm

### Tech Stack

- node.js
- express.js
- mySql
- nodemon
- jsonwebtoken
- bcrypt
- Angular

## To get a password:

- node
- require('bcrypt').hash('123456', 10, function(e,h){console.log(h)})
- in the hash('password', time-how hard the password will be encrypted)
- getting the password (to over right the sign in)

## Prepare The Environment

1. Create a new MySQL database.
2. Install dependencies: `npm install`
3. Install nodemon globally: `npm i -g nodemon` and update `package.json` accordingly.
4. In project, add configuration file: `config/dev.js`
   with database connection details.
5. Run the app:
   - Windows: `SET DEBUG='royal-crm:\*'; npm start`
   - MacOS/Linux: `$ DEBUG=royal-crm:* npm start`
