module.exports = (req, res, next) => {
    if (req.session.user.role === 'Shipper') {
        return next()
    }
    return res.redirect('/login');
}