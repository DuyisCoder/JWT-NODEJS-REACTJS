// import connection from '../config/connectDB';
import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2/promise'

const connection = mysql.createPool({
    host: 'localhost',
    database: 'jwt',
    user: 'root',
})
const hashUserPassword = (userPassword) => {
    // // Mã hóa mật khẩu
    // let hashPassword = bcrypt.hashSync(password, salt);
    // // KT mật khẩu nhập có đúng với mật khẩu mã hóa
    // let check = bcrypt.compareSync(password, hashPassword);
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
        console.log("Thành công");
    } catch (error) {
        console.log("Check error", error);
    }
}
const getAlluser = async () => {
    // test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "username", "email"], // dùng để log ra những thông tin cần thiết
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true // dùng để gom các trường chung vào 1 object
    })
    console.log("Check new user", newUser);
    // let newRoles = await db.Role.findAll({
    //     where: { id: 1 },
    //     include: { model: db.Group, where: { id: 1 } },
    //     raw: true,
    //     nest: true // dùng để gom các trường chung vào 1 object
    // })
    // console.log("Check new user", newRoles);


    let user = [];
    user = db.User.findAll();
    return user;
}
const removeUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
}
const getUserbyId = async (userId) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: userId }
    })
    // CONVERT Sequelize Modals to Javascript thuần
    return user.get({ plain: true });
}
const updateUser = async (email, username, userId) => {
    await db.User.update({
        email: email,
        username: username,
    }, { where: { id: userId } })
}
module.exports = {
    createNewUser, getAlluser, removeUser, getUserbyId, updateUser
}