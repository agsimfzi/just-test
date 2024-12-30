const expres = require('express')
const authRoutes = require('./routes/auth_routes')
const categoriesRoutes = require('./routes/category_routes')
const articlesRoutes = require('./routes/article_routes')

const router = expres.Router()

routeGroups = [
    {
        path: '/',
        routes: authRoutes,
    },
    {
        path: '/categories',
        routes: categoriesRoutes,
    },
    {
        path: '/articles',
        routes: articlesRoutes,
    },
]

routeGroups.forEach(item => {
    router.use(item.path, item.routes)
});

module.exports = router