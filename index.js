import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;
const MODE = process.env.DEV_MODE;
const Mongo_URL = process.env.Mongo_URL;

import ConnectDB from "./Backend/Config/DBConfig.js";
ConnectDB(Mongo_URL);

//All Project Routes
import router from "./Backend/Routes/index.js";

//Routes
app.use("/Task/api", router);

const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Sever Start... Project 'Neosao Services Company Task' ${MODE} Mode On Port No. ${port};`)
});