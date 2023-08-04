const router = require('express').Router();
const { Users, Posts } = require('../models');

// GET all available posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostsData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });

        const posts = dbPostsData.map((post) =>
            post.get({ plain: true })
        );

        res.render('home', {posts, loggedIn: req.session.loggedIn});

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;