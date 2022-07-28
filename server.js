import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const morgan=require('morgan')
require("dotenv").config();
import { readdirSync } from 'fs';

const app = express();

mongoose.connect(process.env.DATABASEURL, {})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERROR => ", err))

//middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({extended: true}));
app.use(cors()); //can left blank as well

//autoload routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));