const { Users } = require('../models');

const usersData = [
    {
        username: 'user1',
        password: 'password',
    },
    {
        username: 'user2',
        password: 'password',
    },
];

const seedUsers = () => Users.bulkCreate(usersData);

module.exports = seedUsers;