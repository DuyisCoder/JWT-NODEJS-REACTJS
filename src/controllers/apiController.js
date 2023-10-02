
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
            EM: 'Error',
            EC: '-1',
            DT: ""
        })
    }
}
const handleLogin = async (req, res) => {
    try {

        let data = await loginRegisterService.loginUser(req.body);
        console.log(data.password);
    } catch (err) {

    }
}

module.exports = { testApi, handleRegister, handleLogin }