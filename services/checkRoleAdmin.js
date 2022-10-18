require('dotenv').config()

function checkRoleAdmin(req, res, next) {
    if (res.locals.role != process.env.ROLE_ADMIN) {
        res.sendStatus(401)
    } else {
        next()
    }
}

module.exports = { checkRoleAdmin: checkRoleAdmin }