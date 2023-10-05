import groupServices from '../services/groupServices'

const readFunc = async (req, res) => {
    try {
        let data = await groupServices.getAllGroup();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Wrongs on server!",
            EC: 1,
            DT: ""
        })
    }
}

module.exports = {
    readFunc
}