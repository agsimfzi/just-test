const { Op, fn, col } = require('sequelize')
const { validationResult } = require('express-validator')
const { Article } = require('../models')

const findAll = async (req, res, next) => {
    try {
        const opts = { include: 'category', where: {}, order: [] }

        if (req.query.articleId) {
            opts.where.id = req.query.articleId
        }
        if (req.query.userId) {
            opts.where.userId = req.query.userId
        }
        if (req.query.search) {
            opts.where.title = { [Op.like]: `%${req.query.search}%` }
        }
        if (req.query.categoryId) {
            opts.where.categoryId = req.query.categoryId
        }
        if (req.query.createdAt) {
            const range = req.query.createdAt.split(':')
            if (range.length > 1) {
                if (range[0] === '') {
                    opts.where.createdAt = { [Op.lte]: range[1] }
                } else if (range[1] === '') {
                    opts.where.createdAt = { [Op.gte]: range[0] }
                } else {
                    opts.where.createdAt = {
                        [Op.and]: [
                            { [Op.gt]: range[0] },
                            { [Op.lt]: range[1] },
                        ],
                    }
                }
            } else {
                opts.where.createdAt = { [Op.eq]: range[0] }
            }
        }

        if (req.query.sortBy) {
            const allSortBy = req.query.sortBy.split(',')
            allSortBy.forEach(item => {
                const sortByItem = item.split(':')

                if (sortByItem.length > 1) {
                    opts.order = [...opts.order, [sortByItem[0], sortByItem[1]]]
                } else if (item === 'content-length') {
                    opts.order = [...opts.order, [fn('LENGTH', col('content')), 'ASC']]
                }
            })
        }
        const articles = await Article.findAll(opts)

        res.send(articles)
    } catch (err) {
        next(err)
    }
}

const findById = async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.id, { include: ['category', 'user'] })
        res.send(article)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() })
        }

        const article = await Article.create({ userId: req.user.id, ...req.body })
        res.status(201).send(article)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const vresult = validationResult(req)
        if (!vresult.isEmpty()) {
            return res.status(400).send({ errors: vresult.array() })
        }

        const qresult = await Article.update(
            { ...req.body, updatedAt: Date.now() },
            {
                where: {
                    id: req.params.id,
                },
            }
        )

        if (qresult[0] === 0) {
            return res.status(404).json({
                msg: "Article with that ID not found",
            });
        }
        const article = await Article.findByPk(req.params.id)

        res.send(article)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        await Article.destroy({
            where: { id: req.params.id },
            force: true,
        });

        res.status(204).json()
    } catch (err) {
        next(err)
    }
}

module.exports = { findAll, findById, create, update, remove }