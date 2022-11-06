require('dotenv').config()

function checkRoleStudent(req, res, next) {
    if (req.locals.role != process.env.ROLE_STUDENT || req.locals.role != process.env.ROLE_ADMIN) {
        res.sendStatus(401)
    } else {
        next()
    }
}

module.exports = { checkRoleStudent: checkRoleStudent }