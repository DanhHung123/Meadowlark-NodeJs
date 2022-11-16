module.exports = (req,res, next) => {
    res.local.flash = req.session.flash;
    delete req.session.flash;
    next();
}