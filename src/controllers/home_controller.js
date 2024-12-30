const { Article, Category } = require('../models')

const findAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll({ order: [['name', 'ASC']] })
        const articles = await Article.findAll({ include: 'category', order: [['createdAt', 'DESC']] })

        res.send({ categories, articles })
    } catch (err) {
        next(err)
    }
}

module.exports = { findAll }
