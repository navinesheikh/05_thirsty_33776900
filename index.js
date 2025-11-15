// Setup express and ejs
var express = require ('express')
var ejs = require('ejs')

// Create the express application object
const app = express()
const port = 8000

// Middleware to serve static files
app.use(express.static('public'));

// make the current request path available to all EJS views
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser 
app.use(express.urlencoded({ extended: true })); 

// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
