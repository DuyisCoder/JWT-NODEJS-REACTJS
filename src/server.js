import express from 'express'
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import connection from './config/connectDB';
import configCors from './config/cors';
import { createJWT, verifyToken } from './middleware/JWTcookie.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;
// Config Cors middle ware : Security website
configCors(app);
//config view Engine
viewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// test db
connection();
// config body-Parser - đặt trước file Routes
app.use(cookieParser());


// init WebRoute
initWebRoutes(app);
initApiRoutes(app);





app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
})