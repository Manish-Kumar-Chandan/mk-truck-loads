module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/admin/signin");
    } 

    if(req.session.user.role === 'ADMIN') {
        return next()
    }

    return res.redirect('/admin/signin');
}