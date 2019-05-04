
// Declaring a global async function so that we can await some logic
// eg: wait for the db to sync all the models
async function main () {
  // Declaring the differents modules & middlewares that we will use
  const express = require('express');
  // Instanciation of the express app
  const app = express();
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');
  const connectRedis = require('connect-redis');
  const session = require('express-session');
  const redis = require('./utils/redis');
  const models = require('./models/index');
  const userRoute = require('./routes/userRoute');
  const productRoute = require('./routes/productRoute');
  const basketRoute = require('./routes/basketRoute');

  const port = 5000;

  // Use modules and append middelwares to the express app with app.use()

  // Authorize external source communication
  app.use(cors(
    {
      credentials: true, // as we will use cookies
      origin: 'http://localhost:8080' // only allow our front-end app
    }
  ));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // initialize cookie-parser to allow us access the cookies stored in the browser.
  // allows us to access req.cookies
  app.use(cookieParser());

  // initialize express-session to allow us track the logged-in user across sessions.
  const RedisStore = connectRedis(session);

  // adds a session in the request object, allows us to access req.session
  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: 'session_id',
      secret: 'bl4ckb34rdH!j4cK!NG',
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: 'localhost',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
  // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
  app.use((req, res, next) => {
    if (req.cookies.session_id && !req.session.userId) {
      res.clearCookie('session_id');
    }
    next();
  });

  // Defining the routes that will be available in our express app
  app.use('/user', userRoute);
  app.use('/product', productRoute);
  app.use('/basket', basketRoute);

  // Sends not found if requesting for an unexisting route
  app.use((_req, _res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  // Handle errors
  app.use((error, _req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        message: error.message
      }
    });
  });

  // Sync all the models and make sure that our tables exists
  await models.db.sync({ force: true })
    .then(() => console.log('Connected to MySQL'));

  // Lauching the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();
