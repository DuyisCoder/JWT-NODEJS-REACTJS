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
    await connection.query(`INSERT INTO users (email,password,username)
    VALUES (? ,?,?)
`, [email, hashPass, username])
}
const getUserList = async () => {
    const [result, field] = await connection.query(`Select* from users`);
    return result;
}
module.exports = {
    createNewUser, getUserList
}