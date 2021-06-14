module.exports = (req, res, next) => {
    if (req.session.user.role === ('Carrier' || 'Shipper' ) && req.session.user.role  !== 'ADMIN') {
        return next()
    }
    return res.redirect('/login');
}