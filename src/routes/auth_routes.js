const expres = require('express')
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const authController = require('../controllers/auth_controller')

const router = expres.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username.
 *           example: iamuser
 *         password:
 *           type: string
 *           description: The password.
 *           example: 123
 */

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: list of users
 */

/**
 * @swagger
 *
 * /register:
 *   post:
 *     tags: [Auth]
 *     description: Register to the application
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: login
 */
router.post('/register', body('username').notEmpty().trim(), body('password').notEmpty().trim(), authController.register)

/**
 * @swagger
 *
 * /login:
 *   post:
 *     tags: [Auth]
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', body('username').notEmpty().trim(), body('password').notEmpty().trim(), authController.login)

/**
 * @swagger
 *
 * /profile:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags: [Auth]
 *     description: Get logged user profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: profile
 */
router.get('/profile', auth('Admin', 'User'), authController.profile)

module.exports = router
