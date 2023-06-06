// const userSeeds = require('./userSeeds');
// const postSeeds = require('./postSeeds');
// const chatSeeds = require('./chatSeeds');
const { User, Post, Chat } = require('../models')
const sequelize = require('../config/connection');

const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const chatSeeds = require('./chatSeeds.json');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true})
        await User.bulkCreate(userSeeds, {
            individualHooks: true
        });
        await Post.bulkCreate(postSeeds);
        await Chat.bulkCreate(chatSeeds);

        process.exit(0);
    } catch(err) {
        console.log(err)
    }
};

seedAll();