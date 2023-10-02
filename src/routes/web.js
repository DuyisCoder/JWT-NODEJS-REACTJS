
import express from 'express'
import homeController from '../controllers/homeController';
import apiController from '../controllers/apiController'
import { testApi } from '../controllers/apiController';
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getViewHome);
    router.get('/user', homeController.getViewUser);
    router.post('/user/create-user', homeController.handleCreateUser);
    router.get('/list-user', homeController.displayListUser);

    router.post('/delete/user/:id', homeController.handleRemoveUser);
    router.get('/update/user/:id', homeController.updatePage);
    router.post('/update/user', homeController.updateUser);


    return app.use('/', router);
}

export default initWebRoutes;