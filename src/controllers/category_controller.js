const { Category } = require('../models')
const { validationResult } = require('express-validator')

const findAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll()

        res.send(categories)
    } catch (err) {
        next(err)
    }
}

const findById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        res.send(category)
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
        const category = await Category.create(req.body)

        res.status(201).send(category)
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

        const qresult = await Category.update(
            { ...req.body, updatedAt: Date.now() },
            {
                where: {
                    id: req.params.noteId,
                },
            }
        )

        if (qresult[0] === 0) {
            return res.status(404).json({
                msg: "Category with that ID not found",
            });
        }
        const category = await Category.findByPk(req.params.id)

        res.send(category)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await Category.destroy({
            where: { id: req.params.id },
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
                msg: "Category with that ID not found",
            });
        }

        res.status(204).json()
    } catch (err) {
        next(err)
    }
}

module.exports = { findAll, findById, create, update, remove }