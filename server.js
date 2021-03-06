/////////////////
//DEPENDENCIES
/////////////////
require("dotenv").config();
const express = require("express"); //bringing in the express library
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const mongoose = require("mongoose");
const Provider = require('./models/providers.js');
const Comment = require('./models/comments.js');

/////////////////
//ROUTERS
////////////////
const ProviderRouter = require('./routes/providers.js');
const CommentRouter = require('./routes/comments.js');

/////////////////
//GLOBAL VARIABLES
/////////////////
const PORT = process.env.PORT; //port number for server as defined in environment variables
const NODE_ENV = process.env.NODE_ENV; //"development" or "production"
const mongoURI = process.env.mongoURI + "healthcare"; //URI for connecting to database specified in .env
const db = mongoose.connection; //the mongoose connection object
const mongoConfigObject = { useNewUrlParser: true, useUnifiedTopology: true }; //Config option to eliminate deprecation warnings

///////////////////////////
//CONNECT TO DATABASE
///////////////////////////
// Code for connecting to our mongo database
mongoose.connect(mongoURI, mongoConfigObject, () => {
    console.log("CONNECTED TO MONGO");
  }); //This function actually connects to the db

////////////////////////////
//CONNECTION MESSAGING
///////////////////////////
//Building in messages so we know when our database connection changes
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected!"));
db.on("disconnected", () => console.log("mongo disconnected"));

/////////////////////
// CORS SECURITY CONFIGURATIONS
///////////////////
const whitelist = [
    "http://localhost:3000/",
    "http://localhost:3000",
  ];
  const corsOptions = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

/////////////////////
// MIDDLEWARE
////////////////////
//UTILITY FUNCTIONS THAT RUN BEFORE YOUR ROUTES
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions)); //ternary operator
//Enables websites in whitelist to make API calls to your server, enables all sites in development
app.use(express.json()); //When you send JSON data to your API, this interprets the JSON data and looks in the body of your request. Parses data and uses it in your body 
app.use(morgan("dev")); //Enables Morgan logging, creating more useful terminal logs while server runs, helps for finding errors
app.use(express.static("public")); //Allows static serving of files from public folder

///////////////////////////
//ROUTERS
///////////////////////////
//These handle sending responses to server requests for specific endpoints
app.use('/providers', ProviderRouter);
app.use('/comments', CommentRouter);

///////////////////////////
//ROOT ROUTE (FOR TESTING)
///////////////////////////
app.get("/", (req, res) => {
    res.send("If you see this then the server is working!");
});

/////////////////
//LISTENER
/////////////////
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})