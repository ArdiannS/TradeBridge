const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(
  session({
    secret: "M&%$jdfg#@^%$kdfh34d5$gfkjg&^%$g2d^#F1j",
    cookie: {},
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(cookieParser());

app.use((req, res, next) => {
    console.log('Session1:', req.session);
    next();
});

const corsOptions = {
    // TODO: take this from the config file?
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cookie'],
    exposedHeaders: ['set-cookie'],
};

// Enable CORS for all routes
app.use(cors(corsOptions));

const database = require("./Configuration/DataBaseConnection");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(5000);
const router = require("./Routes/routes");
app.use(router);
