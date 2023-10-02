require('dotenv').config();
const configCors = (app) => {
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
}
export default configCors;