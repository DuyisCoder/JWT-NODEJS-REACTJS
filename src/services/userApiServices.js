import db from "../models/index";

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "sex", "phone"], // dùng để log ra những thông tin cần thiết
            include: { model: db.Group, attributes: ["name", "description"] },
            nest: true // dùng để gom các trường chung vào 1 object
        });
        if (users) {
            console.log("check user", users);
            return {
                EM: "Get userData success!",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "Get userData error!",
                EC: -1,
                DT: ''
            }
        }

    } catch (error) {
        return {
            EM: "Error services!",
            EC: 1,
            DT: ''
        }
    }
}
const getUserPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'Fetch data success!',
            EC: 0,
            DT: data
        }
    } catch (e) {
        return {
            EM: "Error services!",
            EC: 1,
            DT: []
        }
    }
}
const createUser = async (data) => {
    try {

    } catch (error) {

    }
}
const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await db.User.update({
                email: data.email,
            })
        }
    } catch (error) {

    }
}

module.exports = { getAllUser, getUserPagination }