import express from 'express'
import viewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

const app = express();
const PORT = process.env.PORT || 8080;

//config view Engine
viewEngine(app);

// init WebRoute
initWebRoutes(app);



app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
})