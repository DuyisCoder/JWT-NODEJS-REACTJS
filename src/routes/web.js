
import express from 'express'
import homeController from '../controllers/homeController';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handleHello);
    router.get('/user', homeController.getViewUser);
    return app.use('/', router);
}

export default initWebRoutes;