const router = require('express').Router()
const projectRoutes = require('./projectRoutes.js')

router.use('/projects', projectRoutes)



module.exports = router