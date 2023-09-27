import userServices from '../services/userServices'
const getViewUser = (req, res) => {
    res.render('user.ejs')
}
const getViewHome = async (req, res) => {
    res.render('home.ejs')
}
const handleCreateUser = async (req, res) => {
    let { email, password, username } = req.body;
    userServices.createNewUser(email, password, username);
    res.redirect('/list-user');
}
const displayListUser = async (req, res) => {
    let results = await userServices.getAlluser();
    res.render('listUser.ejs', { user: results });
}
const handleRemoveUser = async (req, res) => {
    let userId = req.params.id; // dùng để lấy id qua thư viện body-Parser
    await userServices.removeUser(userId);
    res.redirect('/list-user');
}
const updatePage = async (req, res) => {
    let userId = req.params.id;
    let user = await userServices.getUserbyId(userId);
    let userData = {};
    userData = user;
    res.render('edit.ejs', { user: userData });
}
const updateUser = async (req, res) => {
    let { email, username, id } = req.body;
    let result = await userServices.updateUser(email, username, id);
    res.redirect('/list-user');
}
module.exports = {
    getViewUser, handleCreateUser, getViewHome, displayListUser, handleRemoveUser, updatePage, updateUser
}