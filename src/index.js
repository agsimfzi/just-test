const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const { sequelize } = require('./services/db')
const router = require('./router')
const jwtStrategy = require('./middleware/jwt_strategy')
const errorHandler = require('./middleware/error_handler')
const { swaggerUiServe, swaggerUiSetup } = require('./middleware/swagger_ui_setup')
const app = express();
const port = process.env.PORT || 8000

app.disable('x-powered-by')
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use('/api-docs', swaggerUiServe, swaggerUiSetup)
app.use('/', router)
app.use(errorHandler)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

process.on('SIGINT', async () => {
    process.exit();
})
