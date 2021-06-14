module.exports = (req, res, next) => {
    if (req.session.user) {
        if (req.user.role !== 'ADMIN') {
            return next()
        }
        return res.redirect('/admin/dashboard')

    }
    next()
}