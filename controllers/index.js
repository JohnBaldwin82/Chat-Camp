const router = require('express').Router();
const apiRoute = require('./api');


router.use('/api', apiRoutes);

module.exports = router