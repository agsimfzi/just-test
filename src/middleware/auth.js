const passport = require('passport')

const verifyCallback = (req, resolve, reject, opts) => async (err, user, info) => {
    const { optional, roles, model } = opts

    req.user = user
    if (!optional && (err || info || !user)) {
        return reject(new Error('Please authenticate'))
    } else {
        return resolve()
    }

    if (roles) {
        if (model) {
            const data = await model.findByPk(req.params.id)
            if (data) {
                if (data.userId === user.id || roles.some(item => item === user.role)) {
                    return resolve()
                }
            }
        } else {
            if (roles.some(item => item === user.role)) {
                return resolve()
            }
        }
    } else {
        if (user) {
            return resolve()
        }
    }

    reject(new Error('Forbidden'))
}

const auth = (opts) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, opts))(req, res, next)
    })
        .then(() => next())
        .catch((err) => {
            return res.status(401).send({ msg: err.message })
        })
};

module.exports = auth
