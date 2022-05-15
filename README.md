# royal-crm

### Tech Stack

- node.js
- express.js
- mySql

## Prepare The Environment

1. Create a new MySQL database.
2. Install dependencies: `npm install`
3. Install nodemon globally: `npm i -g nodemon` and update `package.json` accordingly.
4. In project, add configuration file: `config/dev.js`
   with database connection details.
5. Run the app:
   - Windows: `SET DEBUG='royal-crm:\*'; npm start`
   - MacOS/Linux: `$ DEBUG=royal-crm:* npm start`
