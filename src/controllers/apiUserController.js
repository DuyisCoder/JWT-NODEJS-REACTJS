import userApiServices from '../services/userApiServices'
const handleReadUser = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query;
            let data = await userApiServices.getUserPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            let data = await userApiServices.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Error",
            EC: -1,
            DT: ""
        })
    }
}
const handleCreateUser = (req, res) => {

}
const handleUpdateUser = (req, res) => {

}
const handleRemoveUser = (req, res) => {

}

module.exports = { handleReadUser, handleCreateUser, handleUpdateUser, handleRemoveUser };