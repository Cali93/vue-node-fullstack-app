# Dressing Web App

### A Web App made with: 

- VueJS as a front-end SPA framework
- Vuetify as a front-end components library using Material Design rules
- NodeJS and Express to handle our REST API
- Sequelize to interact with our relational database (eg: MySQL, or PostgreSQL)

### Local usage :

```
1. cd in dressing-api & dressing-front and npm install inside both directories
2. In dressing-api/config, create a db.js file as bellow:
  module.exports = {
    dialect: 'mysql',
    database: 'db name',
    username: 'db user',
    password: 'db password',
    host: 'db host',
    port: 3306
  };
4. npm start
5. check localhost:5000, your api should be running
```