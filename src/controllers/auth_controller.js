const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const { User } = require('../models')

const register = async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() })
        }

        await User.create({
            username: req.body.username,
            password: req.body.password,
            role: 'User',
        })

        res.send({ msg: 'Registration success, please login' })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() })
        }

        const user = await User.findOne({ where: { username: req.body.username }})

        if (!user || !bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({ msg: 'Invalid username or password' })
        }

        const payload = {
            sub: user.id,
            iat: moment().unix(),
            exp: moment().add(900, 'minutes').unix(),
            type: 'access'
        }
        const token = jwt.sign(payload, 'secret')

        res.send({
            ...user.toJSON(),
            password: undefined,
            accessToken: token
        })
    } catch (err) {
        next(err)
    }
}

const profile = (req, res, next) => {
    try {
        res.send({
            ...req.user.toJSON(),
            password: undefined
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { register, login, profile }