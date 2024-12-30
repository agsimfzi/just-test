const expres = require('express')
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const categoryController = require('../controllers/category_controller')

const router = expres.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name.
 *           example: Software Engineer
 */

/**
 * @swagger
 *  tags:
 *    name: Category
 *    description: list of articles
 */

router.route('/')
    /**
     * @swagger
     *
     * /categories:
     *   post:
     *     security:
     *      - bearerAuth: []
     *     tags: [Category]
     *     description: Create the category
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       200:
     *         description: Category
     */
    .post(
        auth('Admin'),
        body('name').notEmpty().trim(),
        categoryController.create
    )

    /**
     * @swagger
     *
     * /categories:
     *   get:
     *     tags: [Category]
     *     description: Get all categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Category
     */
    .get(categoryController.findAll)

router.route('/:id')
    /**
     * @swagger
     *
     * /categories/{id}:
     *   get:
     *     security:
     *      - bearerAuth: []
     *     tags: [Category]
     *     description: Create the article
     *     produces:
     *       - application/json
     *     parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: Category ID
     *     responses:
     *       200:
     *         description: Category
     */
    .get(categoryController.findById)
        /**
     * @swagger
     *
     * /categories/{id}:
     *   put:
     *     security:
     *      - bearerAuth: []
     *     tags: [Category]
     *     description: Update the category
     *     produces:
     *       - application/json
     *     parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: Category ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       200:
     *         description: Category
     */
    .put(
        auth('Admin'),
        body('name').notEmpty().trim(),
        categoryController.update
    )
        /**
     * @swagger
     *
     * /categories/{id}:
     *   delete:
     *     security:
     *      - bearerAuth: []
     *     tags: [Category]
     *     description: Delete the category
     *     parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: Category ID
     *     responses:
     *       204:
     *         description: No content
     */
    .delete(auth('Admin'), categoryController.remove)

module.exports = router