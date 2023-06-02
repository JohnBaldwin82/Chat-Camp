const router = require('express').Router()
const postRoutes = require('./postRoutes.js')
const aiRoutes = require('./aiRoutes.js')

router.use('/projects', postRoutes)
router.use('/chatGpt', aiRoutes)


module.exports = router