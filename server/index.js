// run node index.js to start server
// the videos use require syntax because ES6 is not available in version used
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

//db setup
mongoose.connect("mongodb://localhost:auth/auth");

//App setup
app.use(morgan("combined")); //log incoming requests, used mostly for debugging
app.use(bodyParser.json({ type: "*/*" })); // parse incoming requests into json regardless of type
router(app);

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on: ", port);
