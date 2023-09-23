
import express from 'express'
import homeController from '../controllers/homeController';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/user', homeController.getViewUser);
    router.post('/users/create-user', homeController.handleCreateUser);
    return app.use('/', router);
}

export default initWebRoutes;