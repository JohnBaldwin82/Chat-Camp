const { User } = require('../models');

const userData = [
    {
        username: 'Adam',
        email: 'adam@hotmail.com',
        password: 'password12345'
    },
    {
        username: 'Jenny',
        email: 'jenny@gmail.com',
        password: 'password12345'
    },
    {
        username: 'Nicola',
        email: 'nicola@nuggets.com',
        password: 'password12345'
    }
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;