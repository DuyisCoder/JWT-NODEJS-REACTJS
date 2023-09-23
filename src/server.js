import express from 'express'
import viewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 8080;

//config view Engine
viewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// init WebRoute
initWebRoutes(app);



app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
})