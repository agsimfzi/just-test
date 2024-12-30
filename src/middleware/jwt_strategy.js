const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')

const jwtStrategy = new JwtStrategy({ secretOrKey: 'secret', jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }, async (payload, done) => {
    try {
        if (payload.type !== 'access') {
            throw new Error('Invalid toke type')
        }

        const user = await User.findByPk(payload.sub)
        if (!user) {
            return done(null, false)
        }
        
        done(null, user)
    } catch (err) {
        done(err, false)
    }
})
module.exports = jwtStrategy
