const expres = require('express')
const homeController = require('../controllers/home_controller')

const router = expres.Router()
/**
 * @swagger
 *  tags:
 *    name: Home
 *    description: All of Home Data
 */

/**
 * @swagger
 *
 * /home:
 *   get:
 *     tags: [Home]
 *     description: Get all Home Data
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All Home data
 */
router.get('/', homeController.findAll)

module.exports = router