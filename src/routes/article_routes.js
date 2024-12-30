const expres = require('express')
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const articleController = require('../controllers/article_controller')

const router = expres.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *           description: The username.
 *           example: iamuser
 *         title:
 *           type: string
 *           description: The password.
 *           example: 123
 *         content:
 *           type: string
 *           description: The password.
 *           example: 123
 */

/**
 * @swagger
 *  tags:
 *    name: Article
 *    description: list of articles
 */

router.route('/')
    /**
     * @swagger
     *
     * /articles:
     *   post:
     *     security:
     *      - bearerAuth: []
     *     tags: [Article]
     *     description: Create the article
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Article'
     *     responses:
     *       200:
     *         description: login
     */
    .post(
        auth('Admin'),
        body('userId').notEmpty().trim(),
        body('categoryId').notEmpty().trim(),
        body('title').notEmpty().trim(),
        body('content').notEmpty().trim(),
        articleController.create
    )
    
    router.route('/')
    /**
     * @swagger
     *
     * /articles:
     *   get:
     *     tags: [Article]
     *     description: Get all articles
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: login
     */
    .get(articleController.findAll)

router.route('/:id')
    /**
     * @swagger
     *
     * /articles/{id}:
     *   get:
     *     security:
     *      - bearerAuth: []
     *     tags: [Article]
     *     description: Create the article
     *     produces:
     *       - application/json
     *     parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: Article ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Article'
     *     responses:
     *       200:
     *         description: login
     */
    .get(articleController.findById)
        /**
     * @swagger
     *
     * /articles/{id}:
     *   post:
     *     security:
     *      - bearerAuth: []
     *     tags: [Article]
     *     description: Create the article
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Article'
     *     responses:
     *       200:
     *         description: login
     */
    .put(articleController.update)
        /**
     * @swagger
     *
     * /articles/{id}:
     *   delete:
     *     security:
     *      - bearerAuth: []
     *     tags: [Article]
     *     description: Delete the article
     *     responses:
     *       200:
     *         description: Delete Article
     */
    .delete(articleController.remove)

module.exports = router