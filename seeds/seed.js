const userSeeds = require('./userSeeds');
const postSeeds = require('./postSeeds');
const chatSeeds = require('./chatSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await userSeeds();
    await postSeeds();
    await chatSeeds();

    process.exit(0);
};

seedAll();