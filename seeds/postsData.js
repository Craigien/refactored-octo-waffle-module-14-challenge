const { Posts } = require('../models');

const postsData = [
    {
        title: 'Why MVC is so Important',
        text: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
        date: '8/3/2023',
        user_id: 1
    },
    {
        title: 'Authentication vs. Authorization',
        text: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
        date: '8/3/2023',
        user_id: 1,
    },
    {
        title: 'Object-Relational Mapping',
        text: `I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!`,
        date: '8/3/2023',
        user_id: 2,
    },
];

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;