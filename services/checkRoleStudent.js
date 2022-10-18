require('dotenv').config()

function checkRoleStudent(req, res, next) {
    if (res.locals.role != process.env.ROLE_STUDENT || res.locals.role != process.env.ROLE_ADMIN) {
        res.sendStatus(401)
    } else {
        next()
    }
}

module.exports = { checkRoleStudent: checkRoleStudent }