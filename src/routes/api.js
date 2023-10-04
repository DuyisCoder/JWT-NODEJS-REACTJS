import express from 'express'
import apiController from '../controllers/apiController'
import apiUserController from '../controllers/apiUserController';
const router = express.Router();

const initApiRoutes = (app) => {
    router.get('/test-api', apiController.testApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    router.get('/user/read', apiUserController.handleReadUser);
    router.post('/user/create', apiUserController.handleCreateUser);
    router.put('/user/update', apiUserController.handleUpdateUser);
    router.delete('/user/delete', apiUserController.handleRemoveUser);
    return app.use('/api/v1/', router);
}

export default initApiRoutes;