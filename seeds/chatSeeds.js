const { Chat } = require('../models');

const chatData = [
    {
        chat_text: 'That is a very interesting subject to learn!',
        post_id: 1,
        user_id: 2
    },
    {
        chat_text: 'Only if coding was easy as watching tv.',
        post_id: 3,
        user_id: 3
    },
    {
        chat_text: 'I know its tough but keep grinding!',
        post_id: 2,
        user_id: 1
    }
]

const chatSeeds = () => Chat.bulkCreate(chatData);

module.exports = chatSeeds