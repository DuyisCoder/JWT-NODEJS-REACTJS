
const handleHello = (req, res) => {
    res.send('hello');
}
const getViewUser = (req, res) => {
    res.render('home.ejs')
}

module.exports = {
    handleHello, getViewUser
}