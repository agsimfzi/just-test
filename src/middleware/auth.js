const passport = require('passport')

const verifyCallback = (req, resolve, reject, roles) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new Error('Please authenticate'))
    }
    req.user = user

    if (roles.some(item => item === user.role)) {
        return resolve()
    }

    reject(new Error('Forbidden'))
}

const auth = (...roles) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, roles))(req, res, next)
    })
        .then(() => next())
        .catch((err) => {
            return res.status(401).send({ msg: err.message })
        })
};

module.exports = auth