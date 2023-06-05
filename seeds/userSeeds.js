const { User } = require('../models');

const userData = [
    {
        name: 'Adam',
        email: 'adam@hotmail.com',
        password: 'password12345'
    },
    {
        name: 'Jenny',
        email: 'jenny@gmail.com',
        password: 'password12345'
    },
    {
        name: 'Nicola',
        email: 'nicola@nuggets.com',
        password: 'password12345'
    }
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;