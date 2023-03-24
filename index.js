// environment variables configuration
const dotenv = require("dotenv");
const path = require("path");
dotenv.config()
const NodeEnv = process.env.NODE_ENV;
dotenv.config({
    path: path.join(__dirname, `.env.${NodeEnv}`)
});


// running the server
const Application = require('./app/server');
new Application(process.env.PORT, process.env.DB_URL);