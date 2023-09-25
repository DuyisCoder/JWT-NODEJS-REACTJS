import connection from '../configs/database'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

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
    const [result, field] = await connection.query(`INSERT INTO users (email,password,username)
    VALUES (? ,?,?)
`, [email, hashPass, username])
}
const getAllUsers = async () => {
    const [result, field] = await connection.query(`Select* from users`);
    return result;
}
const removeUser = async (userId) => {
    const [results, fields] = await connection.query(`DELETE from users where id= ? `, [userId]);
    console.log(userId);
    return results;
}
const getUserbyId = async (userId) => {
    const [results, fields] = await connection.query(`Select * from users where id=?`, [userId]);
    return results;
}
const updateUser = async (email, username, userId) => {
    const [results, fields] = await connection.query(`
    Update users Set email=?,username=? Where id=?`
        , [email, username, userId]);
    return results;
}
module.exports = {
    createNewUser, getAllUsers, removeUser, getUserbyId, updateUser
}