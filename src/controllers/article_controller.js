const { Article } = require('../models')
const { validationResult } = require('express-validator')

const findAll = async (req, res, next) => {
    try {
        const articles = await Article.findAll()

        res.send(articles)
    } catch (err) {
        next(err)
    }
}

const findById = async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.id)
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
        const result = await Article.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
                msg: "Article with that ID not found",
            });
        }

        res.status(204).json()
    } catch (err) {
        next(err)
    }
}

module.exports = { findAll, findById, create, update, remove }