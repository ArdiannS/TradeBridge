const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const database = require('./Configuration/DataBaseConnection')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(5000);
const router = require("./Routes/routes");
app.use(router);
