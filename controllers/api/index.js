const router = require('express').Router()
const postRoutes = require('./postRoutes.js')
const aiRoutes = require('./aiRoutes.js')
const userRoutes = require('./userRoutes.js')
const chatRoutes = require()

router.use('/projects', postRoutes)
router.use('/chatGpt', aiRoutes)
router.use('/users', userRoutes);


module.exports = router