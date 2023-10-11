import express from 'express'
import apiController from '../controllers/apiController'
import apiUserController from '../controllers/apiUserController';
import groupController from '../controllers/groupController'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTcookie.js'
const router = express.Router();

// const checkUser = (req, res, next) => {
//     const nonSecurePaths = ['/', '/login', '/register'];
//     if (nonSecurePaths.includes(req.path)) return next();
//     //authenticated user
//     if (user) {

//     } else {

//     }
//     next();
// }
const initApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission);


    router.get('/test-api', apiController.testApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    router.get('/account', apiUserController.getUserAccount);
    router.get('/user/read', apiUserController.handleReadUser);
    router.delete('/user/delete', apiUserController.handleRemoveUser);
    router.post('/user/create', apiUserController.handleCreateUser);
    router.put('/user/update', apiUserController.handleUpdateUser);

    router.get('/group/read', groupController.readFunc);
    return app.use('/api/v1/', router);
}

export default initApiRoutes;