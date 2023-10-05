import db from "../models/index";
const getAllGroup = async (req, res) => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        return {
            EM: "GET GROUP SUCCESS",
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "GET GROUP WRONGS",
            EC: 1,
            DT: ""
        }
    }
}

module.exports = {
    getAllGroup
}