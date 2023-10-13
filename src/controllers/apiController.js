
import loginRegisterService from '../services/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test-api asdadas'
    })
}
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.phone) {
            return res.status(200).json({
                EM: 'Missing required',
                EC: '1',
                DT: ''
            })
        }
        // services : create-user
        let data = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ""
        })
    }
}
const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.loginUser(req.body);
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (err) {
        console.log("Err:", err);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ""
        })
    }
}
const handleLogout = (req, res) => {
    try {
        res.clearCookie('jwt'); // xóa token
        return res.status(200).json({
            EM: 'Clear Cookies Done!',
            EC: 0,
            DT: ''
        })
    } catch (err) {
        console.log("Err:", err);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ""
        })
    }
}

module.exports = { testApi, handleRegister, handleLogin, handleLogout }