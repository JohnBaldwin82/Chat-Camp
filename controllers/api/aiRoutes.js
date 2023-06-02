const router = require('express').Router()

const { config } = require("dotenv");
config();

const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline")

router.post('/', async (req, res) => {
    const openai = new OpenAIApi(
        new Configuration({
          apiKey: process.env.API_KEY
        })
      );
      
      const userInterface = readline.createInterface({
          input: process.stdin,
          output: process.stdout
      })
      
      userInterface.prompt()
      userInterface.on("line", async input =>{
      const res = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
      })
       
          userInterface.prompt()
        })
    res.status(200).json({
        message: res.data.choices[0].message.content
    })
})


module.exports = router