const router = require('express').Router();
const { Posts, Users } = require('../../models');

const withAuth = require('../../utils/auth');

// GET all user's posts
router.get('/', withAuth, async (req, res) => {
    try {
        const dbUserPosts = await Posts.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });

        if (!dbUserPosts) {
            console.log("User has no posts");
            return res.status(404).json("User has no posts");
        }

        const posts = dbUserPosts.map((post) =>
            post.get({ plain: true })
        );

        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });

    } catch (err) {
        res.status(500).json(err);
    }
});

// POST new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            title: req.body.title,
            text: req.body.text,
            date: req.body.fullDate,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;