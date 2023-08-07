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

// PUT updated post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Posts.update({
            title: req.body.title,
            text: req.body.text,
            date: req.body.fullDate,
        },
        {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Posts.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!dbPostData)
        {
            res.status(404).json({ message: "No post found with that ID" });
            return;
        }

        res.status(200).json(dbPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;