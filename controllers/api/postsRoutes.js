const router = require('express').Router();
const { Posts, Comments, Users } = require('../../models');

const withAuth = require('../../utils/auth');

// GET one post by ID and display all comments
router.get('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: ['username', 'id'],
                },
                {
                    model: Comments,
                    attributes: ['text', 'date', 'user_id'],

                    include: [
                        {
                            model: Users,
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });

        const post = dbPostData.get({ plain: true });

        res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST a new comment to one post
router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comments.create({
            text: req.body.commentText,
            date: req.body.fullDate,
            post_id: req.params.id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;