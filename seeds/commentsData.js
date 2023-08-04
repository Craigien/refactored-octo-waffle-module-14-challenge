const { Comments } = require('../models');

const commentsData = [
    {
        text: `I just learned about this in class. It's so helpful!`,
        date: '8/3/2023',
        post_id: 1,
        user_id: 2,
    },
];

const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;