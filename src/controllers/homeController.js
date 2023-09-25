import connection from '../configs/database'
import userServices from '../services/userServices'
const getViewUser = (req, res) => {
    res.render('user.ejs')
}
const getViewHome = async (req, res) => {
    res.render('home.ejs')
}
const handleCreateUser = async (req, res) => {
    let { email, password, username, id } = req.body;
    console.log("ID là :", id);
    userServices.createNewUser(email, password, username);
    res.send('OKKK');
}
const displayListUser = async (req, res) => {
    let results = await userServices.getAllUsers();
    res.render('listUser.ejs', { user: results });
}
const handleRemoveUser = async (req, res) => {
    let userId = req.body.id;

    let check = await userServices.removeUser(userId);
    console.log("Check >", check);
    res.send('ok');
}
module.exports = {
    getViewUser, handleCreateUser, getViewHome, displayListUser, handleRemoveUser
}