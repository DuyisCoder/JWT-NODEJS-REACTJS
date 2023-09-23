import userServices from '../services/userServices'
const getViewUser = (req, res) => {
    res.render('user.ejs')
}
const handleCreateUser = async (req, res) => {
    let { email, password, username } = req.body;
    userServices.createNewUser(email, password, username);

    res.send('OKKK');
}

module.exports = {
    getViewUser, handleCreateUser
}