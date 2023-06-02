const { Post } = require('../models');

const postData = [
    {
        title: 'JavaScript',
        post_text: 'JavaScript is a scripting or programming language that allows you to implement complex features on web pages',
        user_id: 1,
    },
    {
        title: 'HTML',
        post_text: 'Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.',
        user_id: 2,
    },
    {
        title: 'ChatGPT',
        post_text: 'ChatGPT is a natural language processing tool driven by AI technology that allows you to have human-like conversations and much more with the chatbot.',
        user_id: 3,
    }
]

const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds