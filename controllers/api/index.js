const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postsRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;