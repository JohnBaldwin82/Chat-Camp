const router = require('express').Router();
const { User, Post, Chat } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            order: [[ 'created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Chat,
                    attributes: ['id', 'chat_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    },
                },
            ],
        });
        const post = postData.map((post) => post.get({ plain: true}));
        
        res.render('homepage', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne(req.params.id, {
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Chat,
                    attributes: ['id', 'chat_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    },
                },
            ],
        });
        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post, Chat }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    console.log('connecting')
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
  });

module.exports = router;