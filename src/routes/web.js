
import express from 'express'
import homeController from '../controllers/homeController';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getViewHome);
    router.get('/user', homeController.getViewUser);
    router.post('/users/create-user', homeController.handleCreateUser);
    router.get('/remove/:id', homeController.handleRemoveUser);
    router.get('/list-user', homeController.displayListUser);
    return app.use('/', router);
}

export default initWebRoutes;