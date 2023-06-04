const router = require('express').Router();
const { post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(posttData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
