require('dotenv').config();
import jwt from 'jsonwebtoken'
// Bỏ qua các router không cần check 
const nonSecurePaths = ['/', '/login', '/register', '/logout'];
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN // thời gian token hết hạn
        });
        console.log(token);
    } catch (error) {
        console.log(error);
    }
    return token;
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (e) {
        console.log(e);
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    let tokenFormHeader = extractToken(req);
    console.log("111111", tokenFormHeader);
    if ((cookies && cookies.jwt) || tokenFormHeader) {
        console.log("hear", tokenFormHeader);
        console.log("cookies", cookies);
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFormHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded
            req.token = token
            next();
        } else {
            return res.status(401).json({
                EM: "Not authenticated a User!",
                EC: 1,
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EM: "Not authenticated a User!",
            EC: 1,
            DT: ''
        })
    }
}
const extractToken = (req) => {
    // Nếu ta có truyền token lên header và header có token thì sẽ lấy nó 
    // Ngc lại trả về null
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    // else if (req.query && req.query.token) {
    //     return req.query.token;
    // }
    return null;
}
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    if (req.user) {
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        console.log("URL hiện tại", currentUrl);
        let email = req.user.email;
        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EM: "Your don't have permission to access this resource",
                EC: 1,
                DT: ''
            })
        } else {
            let canAccess = roles.some((item) => item.url === currentUrl);

            if (canAccess === true) {
                next();
            } else {
                return res.status(403).json({
                    EM: "Your don't have permission to access this resource",
                    EC: 1,
                    DT: ''
                })
            }
        }
    } else {
        return res.status(401).json({
            EM: "Not authenticated a User!",
            EC: 1,
            DT: ''
        })
    }

}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}