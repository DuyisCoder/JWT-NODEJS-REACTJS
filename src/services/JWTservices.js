import db from "../models"


const getGroupWithRole = async (user) => {
    // tìm trong table Group với ĐK: groupId của user 
    // sau khi lấy dc group của ng dùng-> tìm trong Table Role mà nó đc tạo
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: [
            {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] } // loại bỏ tất cả cột khác kh cần lấy
            }

        ]
    })
    return roles ? roles : {};
}

module.exports = {
    getGroupWithRole
}