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
    const [result, field] = await connection.query(`Select* from user`);
    return result;
}
const removeUser = async (userId) => {
    const [results, fields] = await connection.query(`DELETE from user where id= ? `, [userId]);
    return results;
}
const getUserbyId = async (userId) => {
    const [results, fields] = await connection.query(`Select * from user where id=?`, [userId]);
    return results;
}
const updateUser = async (email, username, userId) => {
    const [results, fields] = await connection.query(`
    Update user Set email=?,username=? Where id=?`
        , [email, username, userId]);
    return results;
}
module.exports = {
    createNewUser, getAlluser, removeUser, getUserbyId, updateUser
}