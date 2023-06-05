const router = require('express').Router();
const { Chat } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const chatData = await Chat.findAll(req.body);

        req.session.save(() => {
            req.session.user_id = chatData.id;
            req.session.logged_in = true;

            res.status(200).json(chatData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newChat = await Chat.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newChat);

    } catch (err) {
        res.status(400).json(err);
    }
});