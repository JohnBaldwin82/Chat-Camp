const router = require('express').Router()

const { config } = require("dotenv");
config();

const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline")

router.post('', async (req, res) => {
    console.log(req.body.message);
    const openai = new OpenAIApi(
        new Configuration({
          apiKey: process.env.API_KEY
        })
      );
      
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.message,
      });

    res.status(200).json({
        message: completion.data.choices[0].text
    })
})


module.exports = router