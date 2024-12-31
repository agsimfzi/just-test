const expres = require('express')
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const articleController = require('../controllers/article_controller')
const { Article } = require('../models')

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
 *           description: The category ID.
 *           example: e0837562-fbe7-4c51-b49b-122163d314b9
 *         title:
 *           type: string
 *           description: The title.
 *           example: What Does a Software Engineer Do?
 *         content:
 *           type: string
 *           description: The content.
 *           example: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
     *         description: Article
     */
    .post(
        auth({ roles: ['Admin'] }),
        body('categoryId').notEmpty().trim(),
        body('title').notEmpty().trim(),
        body('content').notEmpty().trim(),
        articleController.create
    )

    /**
     * @swagger
     *
     * /articles:
     *   get:
     *     tags: [Article]
     *     description: Get all articles
     *     produces:
     *       - application/json
     *     parameters:
     *        - in: query
     *          name: articleId
     *          schema:
     *            type: string
     *          description: Filter by Article ID
     *        - in: query
     *          name: userId
     *          schema:
     *            type: string
     *          description: Filter by User ID
     *        - in: query
     *          name: categoryId
     *          schema:
     *            type: string
     *          description: Filter by Article ID
     *        - in: query
     *          name: search
     *          schema:
     *            type: string
     *          description: Filter by Search in Title
     *        - in: query
     *          name: createdAt
     *          schema:
     *            type: string
     *          description: Filter by Range of YYYY-MM-DD:YYYY-MM-DD or :YYYY-MM-DD or YYYY-MM-DD:(ex. 2024-01-01:2024-12-31 or :2024-12-31 or 2024-01-01:)
     *        - in: query
     *          name: sortBy
     *          schema:
     *            type: string
     *          description: Sort by query in the form of field1,field2:desc/asc,field2:desc/asc or content-length (ex. createdAt:desc,title:asc,content-length)
     *     responses:
     *       200:
     *         description: List of Articles
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
     *     description: Get the article
     *     produces:
     *       - application/json
     *     parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: Article ID
     *     responses:
     *       200:
     *         description: Article
     */
    .get(articleController.findById)
        /**
     * @swagger
     *
     * /articles/{id}:
     *   put:
     *     security:
     *      - bearerAuth: []
     *     tags: [Article]
     *     description: Update the article
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
     *             $ref: '#/components/schemas/Article'
     *     responses:
     *       200:
     *         description: Article
     */
    .put(
        auth({ roles: ['Admin'], model: Article }),
        body('categoryId').notEmpty().trim(),
        body('title').notEmpty().trim(),
        body('content').notEmpty().trim(),
        articleController.update
    )
        /**
     * @swagger
     *
     * /articles/{id}:
     *   delete:
     *     security:
     *      - bearerAuth: []
     *     tags: [Article]
     *     description: Delete the article
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
    .delete(auth({ roles: ['Admin'], model: Article }), articleController.remove)

module.exports = router
