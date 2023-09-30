import express from 'express'
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import connection from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 8080;
// Config Cors middle ware : Security website

app.use(function (req, res, next) {
    // Chỉ cho phép đường link REACT_URL gọi đến server 
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    // PHÂN QUYỀN CÁC METHOD GET......
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

})
//config view Engine
viewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// test db
connection();
// init WebRoute
initWebRoutes(app);



app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
})