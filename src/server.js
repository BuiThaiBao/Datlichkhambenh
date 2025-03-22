import express from "express"
import bodyParser from "body-parser"
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web.js";
require('dotenv').config();

let app = express(); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config app
configViewEngine(app);
initWebRoutes(app);

//start server

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


