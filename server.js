// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const bodyParser = require('body-parser');

// Import Sequelize and create a connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express.js app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Configure session settings
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // Session duration in milliseconds
    httpOnly: true,
    secure: false, // Must set to true in a production environment with HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, // Use the Sequelize connection for session storage
  }),
};

// Use Express.js middleware to enable sessions
app.use(session(sess));

// Set the template engine to Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse JSON and URL-encoded data in requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add body-parser middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes
app.use(routes);

// Add this after your routes
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
