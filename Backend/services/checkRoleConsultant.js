require('dotenv').config()

function checkRoleConsultant(req, res, next) {
    if (res.locals.role != process.env.ROLE_CONSULTANT || res.locals.role != process.env.ROLE_ADMIN) {
        res.sendStatus(401)
    } else {
        next()
    }
}

module.exports = { checkRoleConsultant: checkRoleConsultant }