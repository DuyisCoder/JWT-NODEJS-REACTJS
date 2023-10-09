import bcrypt from 'bcryptjs'
import db from '../models/index'
import loginRegisterService from '../services/loginRegisterService'
import userServices from '../services/userServices.js'

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
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            nest: true, // dùng để gom các trường chung vào 1 object,
            order: [['id', 'DESC']]
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
function regexPhone(phone) {
    const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return regexPhoneNumber.test(phone) ? true : false;
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
        let isEmailExist = await loginRegisterService.checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is exist!!',
                EC: 1,
                DT: 'email'
            }
        }

        if (regexPhone(data.phone) === false) {
            return {
                EM: 'The phone is number from 0 to 9!',
                EC: 1,
                DT: 'phone'
            }
        }
        let isPhoneExist = await loginRegisterService.checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist!',
                EC: 2,
                DT: 'phone',
            }
        }
        if (data.password.length < 6) {
            return {
                EM: 'Password is min 6!!',
                EC: 2,
                DT: 'password',
            }
        }
        let hashPassword = await userServices.hashUserPassword(data.password);

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
        if (!data.groupId) {
            return {
                EM: "Error with groupId",
                EC: -1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        });
        console.log("user", user);
        console.log("data", data.id);
        console.log(data.groupId);
        console.log(data.sex);
        console.log(data.address);
        if (user) {
            console.log("OK");
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: "Update User Success!",
                EC: 0,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Update User Error!",
            EC: 1,
            DT: ""
        }
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

module.exports = { getAllUser, getUserPagination, deleteUser, createUser, updateUser }