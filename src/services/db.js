const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:r41nz@127.0.0.1:5432/justtest')

module.exports = { sequelize }