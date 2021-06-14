module.exports = (req, res, next) => {
    
    let date = new Date().getTime();
    let cookieTime = new Date(req.session.cookie._expires).getTime()

    if (!req.session.user &&  (cookieTime < date)) {
        req.session.destroy(err => {
            return res.redirect("/login");
        })

    } else {
        next()
    }
}