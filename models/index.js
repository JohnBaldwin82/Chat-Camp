const User = require('./User');
const Post = require('./Post');
const Chat = require('./Chat');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Chat.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true
});

Chat.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    hooks: true
});

User.hasMany(Chat, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true
});

Post.hasMany(Chat, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    hooks: true
});

module.exports = { User, Post, Chat };


