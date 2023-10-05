import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);
let checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
let checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}
const hashUserPassword = (userPassword) => {
    // // Mã hóa mật khẩu
    // let hashPassword = bcrypt.hashSync(password, salt);
    // // KT mật khẩu nhập có đúng với mật khẩu mã hóa
    // let check = bcrypt.compareSync(password, hashPassword);
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
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
            limit: limit,
            attributes: ["id", "username", "email", "sex", "phone"], // dùng để log ra những thông tin cần thiết
            include: { model: db.Group, attributes: ["name", "description"] },
            nest: true, // dùng để gom các trường chung vào 1 object
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
        var re = /\S+@\S+\.\S+/;
        let result = re.test(data.email);
        if (result === false) {
            return {
                EM: 'The email required @gmail.com',
                EC: 1,
                DT: data.email
            }
        }
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist!',
                EC: 1,
                DT: data.email
            }
        }

        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let isPassword = data.password;
        let checkPass = regex.test(isPassword);
        if (checkPass === false) {
            return {
                EM: 'Mật khẩu phải có 8 ký tự, 1 chữ cái viết Hoa , viết Thường và 1 số!',
                EC: 1,
                DT: data.password
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The Phone is already exist!',
                EC: 1,
                DT: data.phone
            }
        }
        let hashPassword = await hashUserPassword(data.password);
        let user = await db.User.create({
            ...data,
            email: data.email,
            password: hashPassword,
            phone: data.phone

        });
        return {
            EM: 'Create user success!',
            EC: 0,
            DT: user
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Something error!',
            EC: 1,
            DT: ""
        }
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
const deleteUser = async (userId) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user success!',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not exist!',
                EC: -1,
                DT: data
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'Error!',
            EC: 1,
            DT: ""
        }
    }
}

module.exports = { getAllUser, getUserPagination, deleteUser, createUser }