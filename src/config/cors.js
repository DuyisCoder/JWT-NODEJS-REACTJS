require('dotenv').config();
const configCors = (app) => {
    // Config Cors middle ware : Security website

    app.use(function (req, res, next) {
        // Chỉ cho phép đường link REACT_URL gọi đến server 
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        // PHÂN QUYỀN CÁC METHOD GET......
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        // -> BE cần phải setup 'Access-Control-Allow-Headers' chấp nhận req có cái header X-Reques,Authorization 
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();

    })
}
export default configCors;